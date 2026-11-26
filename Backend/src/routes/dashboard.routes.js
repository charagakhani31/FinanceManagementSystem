import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import dashboardController from "../controllers/dashboard.controller.js"
import chartController from "../controllers/chart.controller.js"


const router = express.Router()

router.get("/dashboard", authMiddleware.authMiddleware, dashboardController.getDashboard)

router.get("/chart", authMiddleware.authMiddleware, chartController.getChartData)

export default router