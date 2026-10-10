import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import expenseController from "../controllers/expense.controller.js";


const router = express.Router();

router.post("/expenses", authMiddleware.authMiddleware, expenseController.createExpense)

router.get("/expenses", authMiddleware.authMiddleware, expenseController.viewExpenses)

router.get("/expense/:id", authMiddleware.authMiddleware, expenseController.getExpense)

router.patch("/expense/:id", authMiddleware.authMiddleware, expenseController.updateExpense)

router.delete("/expense/:id", authMiddleware.authMiddleware, expenseController.deleteExpense)

export default router