import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "UnAuthorized user, token is missing"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded.id);

        if(!user) {
            return res.status(401).json({
                message: "UnAuthorized user"
            })
        }

        if(!user.isActive) {
            return res.status(401).json({
            message: "user is Inactive"
        })
        }

        req.user = user;

        next();
        
    } catch (error) {
       return res.status(403).json({message: "UnAuthorized access, invalid Token"})
        
    }

}

const allowRole = (...role) => {
  return (req, res, next) => {
    if(!role.includes(req.user.role)) {
         return res.status(403).json({message: "Access denied"})
    }

    next()
  }
    
}

export default {authMiddleware, allowRole}