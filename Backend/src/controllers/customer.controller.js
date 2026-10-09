import customerModel from "../models/customer.model.js";

async function createCustomer(req, res) {
    const {customerName, customerEmail, phone, address} = req.body

    const customerExist = await customerModel.findOne({customerEmail});

    if(customerExist) {
        return res.status(401).json({
            message: "customer is already exist"
        })
    }

    const customer = await customerModel.create({
        customerName,
        customerEmail,
        phone,
        address,
        business: req.user.business
    })

    await customer.populate("business", "businessName")

    res.status(201).json({
        message: "customer created successfully",
        customer
    })
    
}

async function viewCustomer(req, res) {

    const customers = await customerModel.find({business: req.user.business});
     
    if(!customers) {
        return res.status(404).json({message: "customers not found"})
    }

    res.status(200).json({
        message: "customers fetched successfully",
        customers
    })
}

async function searchCustomer(req, res) {
    
    const customer = await customerModel.findOne({
        _id: req.params.id,
        business: req.user.business
    })

    if(!customer) {
        return res.status(404).json({message: "customer not found"})
    }

    res.status(200).json({
        message: "customer searched",
        customer
    })
}

async function updateCustomer(req, res) {
     const {customerName, customerEmail, phone, address} = req.body

     const customer = await customerModel.findOneAndUpdate({
        _id: req.params.id,
        business: req.user.business
     }, {
         customerName,
         customerEmail,
         phone,
         address,
     }, {new: true})

     if(!customer) {
        return res.status(404).json({message: "customer not found"})
    }

    res.status(200).json({
        message: "updated successfully",
        customer
    })
}

async function deleteCustomer(req, res) {
    
   const customer = await customerModel.findOneAndDelete({
        _id: req.params.id,
        business: req.user.business
    })

     if(!customer) {
        return res.status(404).json({message: "customer not found"})
    }
    
    res.status(200).json({
        message: "deleted successfully"
    })
}

export default {createCustomer, viewCustomer, searchCustomer, updateCustomer, deleteCustomer}