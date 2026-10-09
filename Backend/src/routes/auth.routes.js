import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", authController.registerUser)

router.post("/login", authController.loginUser)

router.post("/logout", authController.logOutUser)

router.get("/me", authMiddleware.authMiddleware, authController.me)

export default router