import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import saleHistoryController from "../controllers/saleHistory.controller.js";
import salesController from "../controllers/sales.controller.js";

const router = express.Router();

router.get("/history", authMiddleware.authMiddleware, saleHistoryController.getSaleHistory)



export default router