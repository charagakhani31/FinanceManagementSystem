import businessModel from "../models/business.model.js";
import userModel from "../models/user.model.js";

async function createBusiness(req, res) {
    const {businessName, businessEmail, phone, address} = req.body;

    const businessExist = await businessModel.findOne({businessEmail})

    if(businessExist) {
       return res.status(409).json({ message: "business already exist" })
    }
       
    const business = await businessModel.create({
        businessName,
        businessEmail,
        phone,
        address,
        owner: req.user.id
    })

    await userModel.findByIdAndUpdate(req.user.id, {business: business._id})

    await business.populate("owner", "fullName")

    res.status(201).json({
        message: "business created successfully",
        business: {
        businessName: business.businessName,
        businessEmail: business.businessEmail,
        phone: business.phone,
        address: business.address,
        owner: business.owner.fullName
        }
    })

}

async function viewBusiness(req, res) {
    
    if(req.user.business === null) {
        return res.status(404).json({
            message: "Business not found"
        })
    }

    const business = await businessModel.findById(req.user.business);

    res.status(200).json({
        message: "Business fetched successfully",
        business
    })
}

export default {createBusiness, viewBusiness}