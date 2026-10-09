import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

async function createUser(req, res) {

    const {fullName, email, password, role, isActive} = req.body;

    const userExist = await userModel.findOne({email});

    if(userExist) {
        return res.status(422).json({
            message: "user already exit"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullName,
        email,
        password: hash,
        role,
        isActive,
        business: req.user.business
    })

    await user.populate("business", "businessName")
    
    res.status(201).json({
        message: "user created succesfully",
        user : {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        business: user.business.businessName
        }
    })
}

export default {createUser}