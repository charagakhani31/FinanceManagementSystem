import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import salesController from "../controllers/sales.controller.js";

const router = express.Router()

router.post("/sales", authMiddleware.authMiddleware, salesController.createSales)

router.get("/sales", authMiddleware.authMiddleware, salesController.viewSales)

router.get("/sales/:id", authMiddleware.authMiddleware, salesController.getSale)

router.patch("/update/sales/:id", authMiddleware.authMiddleware, salesController.updatePayment)

export default router