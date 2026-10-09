import productModel from "../models/product.model.js";

async function createProduct(req, res) {
    
    const {productName, sku, description, purchasePrice, sellingPrice, quantity} = req.body;

    const productExist = await productModel.findOne({sku, business: req.user.business});

    if(productExist) {
        return res.status(402).json({
            message: "product already exist"
        })
    }

    const product = await productModel.create({
        productName,
        sku, 
        description, 
        purchasePrice, 
        sellingPrice, 
        quantity,
        business: req.user.business
    })

    await product.populate("business", "businessName")

    res.status(201).json({
        message: "product created successfully",
        product: {
                 productName: product.productName,
                 sku: product.sku,
                 description:  product.description,
                 purchasePrice: product.purchasePrice, 
                 sellingPrice: product.sellingPrice, 
                 quantity: product.quantity,
                 business: product.business.businessName,
        }
    })
}

async function viewProducts(req, res) {
    
    const products = await productModel.find({business: req.user.business})

    if(!products) {
        return res.status(404).json({
            message: "products not found"
        })
    }

    res.status(200).json({
        message: "products fetched successfully",
        products
    })
}

async function getProduct(req, res) {
    
    const product = await productModel.findOne({
        _id: req.params.id,
        business: req.user.business
    })

     if(!product) {
        return res.status(404).json({
            message: "product not found"
        })
    }

    res.status(200).json({
        message: "product fetched successfully",
        product
    })
    
}

async function updateProduct(req, res) {

    const {productName,  description, purchasePrice, sellingPrice, quantity} = req.body;

    const product = await productModel.findOneAndUpdate({
         _id: req.params.id,
        business: req.user.business
        }, {
        productName, 
        description, 
        purchasePrice, 
        sellingPrice, 
        quantity,
    }, {new: true})

     if(!product) {
        return res.status(404).json({
            message: "product not found"
        })
    }

    res.status(200).json({
        message: "product updated successfully",
        product
    })
}

async function deleteProduct(req, res) {
    
    const product = await productModel.findOneAndDelete({
         _id: req.params.id,
        business: req.user.business
    })

     if(!product) {
        return res.status(404).json({
            message: "product not found"
        })
    }

    res.status(200).json({
        message: "product deleted successfully",
    })
}


export default {createProduct, viewProducts, getProduct, updateProduct, deleteProduct}