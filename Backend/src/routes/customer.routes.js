import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import customerController from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/customer", authMiddleware.authMiddleware, customerController.createCustomer)

router.get("/customers", authMiddleware.authMiddleware, customerController.viewCustomer)

router.get("/customer/:id", authMiddleware.authMiddleware, customerController.searchCustomer)

router.patch("/update/customer/:id", authMiddleware.authMiddleware, customerController.updateCustomer)

router.delete("/delete/customer/:id", authMiddleware.authMiddleware, authMiddleware.allowRole("owner", "manager"), customerController.deleteCustomer)

export default router