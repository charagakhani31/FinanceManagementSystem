import express from "express";
import cookieparser from "cookie-parser"
import cors from "cors"
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import businessRoutes from "./routes/business.routes.js"
import customerRoutes from "./routes/customer.routes.js"
import vendorRoutes from "./routes/vendor.routes.js"
import productRoutes from "./routes/product.routes.js"
import salesRoutes from "./routes/sales.routes.js"
import expenseRoutes from "./routes/expense.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import saleHistoryRoutes from "./routes/saleHistory.routes.js"

const app = express();

app.use(express.json())
app.use(cookieparser())
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

app.use("/api/auth", authRoutes)
app.use("/api/create", userRoutes)
app.use("/api", businessRoutes)
app.use("/api", customerRoutes)
app.use("/api", vendorRoutes)
app.use("/api", productRoutes)
app.use("/api", salesRoutes)
app.use("/api", expenseRoutes)
app.use("/api", dashboardRoutes)
app.use("/api", saleHistoryRoutes)

export default app