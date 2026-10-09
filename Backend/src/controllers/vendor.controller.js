import vendorModel from "../models/vendor.model.js";

async function createVendor(req, res) {

    const {vendorName, email, phone, address} = req.body;

    const vendorExist = await vendorModel.findOne({email, business: req.user.business});

    if(vendorExist) {
        return res.status(401).json({
            message: "vendor already exist"
        })
    }

    const vendor = await vendorModel.create({
        vendorName,
        email,
        phone, 
        address,
        business: req.user.business
    })

    await vendor.populate("business", "businessName")

    res.status(201).json({
        message: "vendor created successfully",
        vendor : {
        vendorName: vendor.vendorName,
        email: vendor.email,
        phone: vendor.phone,
        address: vendor.address,
        business: vendor.business.businessName }
    })
}

async function viewVendors(req, res) {
    
    const vendors = await vendorModel.find({business: req.user.business})

    if(!vendors) {
        return res.status(404).json({message: "vendors not found"})
    }

    res.status(200).json({
        message: "vendors fetched successfully",
        vendors
    })
}

async function getvendor(req, res) {
    
    const vendor = await vendorModel.findOne({
        _id: req.params.id,
        business: req.user.business
    })

     if(!vendor) {
        return res.status(404).json({message: "vendors not found"})
    }

    res.status(200).json({
        message: "vendor fetched successfully",
        vendor
    })
}

async function updateVendor(req, res) {

    const {vendorName, email, phone, address} = req.body;


    const vendor = await vendorModel.findOneAndUpdate({
         _id: req.params.id,
        business: req.user.business
    }, {
        vendorName,
        email,
        phone, 
        address
    }, {new: true})

    if(!vendor) {
        return res.status(404).json({
            message: "vendor not found"
        })
    }

     res.status(200).json({
        message: "updated successfully",
        vendor
    })
}

async function deleteVendor(req, res) {
    
    const vendor = await vendorModel.findOneAndDelete({
        _id: req.params.id,
        business: req.user.business
    })

     if(!vendor) {
        return res.status(404).json({message: "vendor not found"})
    }
    
    res.status(200).json({
        message: "deleted successfully"
    })
}

export default {createVendor, viewVendors, getvendor, updateVendor, deleteVendor}