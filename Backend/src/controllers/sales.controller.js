import saleModel from "../models/sales.model.js";
import customerModel from "../models/customer.model.js";
import productModel from "../models/product.model.js";
import mongoose from "mongoose";


async function createSales(req, res) {

    const {customer, items, amountPaid = 0} = req.body;

    const session = await mongoose.startSession()

    try {

    session.startTransaction()
    const customerData = await customerModel.findOne({
        _id: customer, 
        business: req.user.business
    }).session(session)

     if(!customerData) {
        await session.abortTransaction();
        return res.status(404).json({
            message: "customer not found"
        })
     }

      let totalAmount = 0;
      const saleItems = [];

      if (!Array.isArray(items) || items.length === 0) {
        await session.abortTransaction();
    return res.status(400).json({
        message: "items must be a non-empty array"
    });
}

      for(const item of items) {

     const productData = await productModel.findOne({
        _id: item.product,
        business: req.user.business
     }).session(session)
    

    if(!productData) {
        await session.abortTransaction();
        return res.status(404).json({
            
            message: "product not found"
        })
     }

     if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        await session.abortTransaction();
    return res.status(400).json({
        message: "quantity must be a positive integer"
    });
    }
     

     if(productData.quantity < item.quantity) {
        await session.abortTransaction();

        return res.status(409).json({
            message: "insufficient stock"
        })
     }

     const unitPrice = productData.sellingPrice

     const subtotal = item.quantity * unitPrice

     totalAmount += subtotal

     saleItems.push({
        product: productData._id,
        productName: productData.productName,
        quantity: item.quantity,
        unitPrice
     })
 
  }
   if (amountPaid < 0 || amountPaid > totalAmount) {
    await session.abortTransaction();
    return res.status(400).json({
        message: "Invalid amount paid"
    });
}

    let paymentStatus;

    if(amountPaid === 0) {
        paymentStatus = "unpaid"
    }
    else if(amountPaid < totalAmount) {
        paymentStatus = "partially_paid"
    }
    else {
        paymentStatus = "paid"
    }

     for(const item of items) {
     await productModel.findOneAndUpdate({
        _id: item.product,
        business: req.user.business
    }, {

        $inc: {quantity: -item.quantity}

    }, {new: true, session})
}

      const [sale] = await saleModel.create([{
        customer,
        items: saleItems,
        totalAmount,
        amountPaid,
        paymentStatus,
        business: req.user.business
      }], { session })

      await session.commitTransaction()

      res.status(201).json({
        message: "sale created successfully", 
        sale
      })

    }

    catch (error) {

    await session.abortTransaction();

    return res.status(500).json({
        message: "Failed to create sale"
    });

 } finally {

    await session.endSession();
}

}

async function viewSales(req, res) {
    
    const sales = await saleModel.find({business: req.user.business})

    if(sales.length === 0) {
        return res.status(404).json({
            message: "sales not found"
        })
    }

    res.status(200).json({
        message: "sales fetched successfully",
        sales
    })
}

async function getSale(req, res) {
    
    const sale = await saleModel.find({
        _id: req.params.id,
        business: req.user.business})

    if(!sale) {
        return res.status(404).json({
            message: "sales not found"
        })
    }

    res.status(200).json({
        message: "sale fetched successfully",
        sale
    })
}

async function updatePayment(req, res) {

    const {amountPaid} = req.body;

       const sale = await saleModel.findOne({ _id: req.params.id,
        business: req.user.business})

   let paymentStatus;

    if(amountPaid === 0) {
        paymentStatus = "unpaid"
    }
    else if(amountPaid < sale.totalAmount) {
        paymentStatus = "partially_paid"
    }
    else {
        paymentStatus = "paid"
    }

    if(amountPaid > sale.totalAmount) {
        return res.status(409).json({
            message: "total amount is less than paid amount"
        })
    }

    const updatedSale = await saleModel.findOneAndUpdate({
         _id: req.params.id,
        business: req.user.business
    }, {
        amountPaid,
        paymentStatus

    }, {new: true})

     if(!updatedSale) {
        return res.status(404).json({
            message: "sale not found"
        })
    }

     res.status(200).json({
        message: "updated successfully",
        updatedSale
    })

}
export default {createSales, viewSales, getSale, updatePayment}