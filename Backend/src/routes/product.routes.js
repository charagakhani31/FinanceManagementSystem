import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import productController from "../controllers/product.controller.js";

const router = express.Router()

router.post("/product", authMiddleware.authMiddleware, productController.createProduct)

router.get("/products", authMiddleware.authMiddleware, productController.viewProducts)

router.get("/products/:id", authMiddleware.authMiddleware, productController.getProduct)

router.patch("/update/products/:id", authMiddleware.authMiddleware, productController.updateProduct)

router.delete("/delete/products/:id", authMiddleware.authMiddleware, productController.deleteProduct)

export default router