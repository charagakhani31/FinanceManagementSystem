import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, 
};


async function registerUser(req, res) {

    const { fullName, email, password, confirmPassword, isActive} = req.body;

    const userExist = await userModel.findOne({email});
    
    if(userExist) {
        return res.status(422).json({
            message: "user already exist"
        });
    };

    if(password !== confirmPassword) {
        return res.status(401).json({
            message: "confirm password not match"
        })
    }

    const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullName,
            email,
            password: hash,
            isActive
        });

 const token = jwt.sign({
    id: user._id,
    role: user.role
 }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    message: "user registered successfully",
    user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
    }
 })
     
}

async function loginUser(req, res) {

    const {email, password, isActive} = req.body;

    const user = await userModel.findOne({email}).select("+password");

    if(!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isvalidPassword = await bcrypt.compare(password, user.password)

    if(!isvalidPassword) {
        return  res.status(401).json({
            message: "Invalid credentials"
        })
    }

    if(!user.isActive) {
         return res.status(401).json({
            message: "user is Inactive"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET_KEY)

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        message: "user logged in successfully",
        user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        }
    })
    
}

async function logOutUser(req,res) {

    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "user is not login"
        })
    }

    res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

    res.status(200).json({
        message: "user logged out successfully"
    })
    
}

async function me(req, res) {

    const user = req.user

    await user.populate("business", "businessName")

    res.status(200).json({
        message: "Current user",
         user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        business: user.business ? user.business.businessName : null
         }
    })
    
}


 export default {registerUser, loginUser, logOutUser, me}