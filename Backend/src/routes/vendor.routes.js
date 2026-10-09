import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import vendorController from "../controllers/vendor.controller.js";

const router = express.Router();

router.post("/create/vendor", authMiddleware.authMiddleware, vendorController.createVendor)

router.get("/vendors", authMiddleware.authMiddleware, vendorController.viewVendors)

router.get("/vendor/:id", authMiddleware.authMiddleware, vendorController.getvendor)

router.patch("/update/vendor/:id", authMiddleware.authMiddleware, vendorController.updateVendor)

router.delete("/delete/vendor/:id", authMiddleware.authMiddleware, vendorController.deleteVendor)

export default router