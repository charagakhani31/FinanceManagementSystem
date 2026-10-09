import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import businessController from "../controllers/business.controller.js";



const router = express.Router();

router.post("/create/business", authMiddleware.authMiddleware, authMiddleware.allowRole("owner"), businessController.createBusiness)

router.get("/business", authMiddleware.authMiddleware, businessController.viewBusiness)

export default router