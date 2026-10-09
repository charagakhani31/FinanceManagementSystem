import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/users", authMiddleware.authMiddleware, authMiddleware.allowRole("owner"), userController.createUser)

export default router