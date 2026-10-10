import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import dashboardController from "../controllers/dashboard.controller.js"

const router = express.Router()

router.get("/dashboard", authMiddleware.authMiddleware, dashboardController.getDashboard)

export default router