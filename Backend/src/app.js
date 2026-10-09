import express from "express";
import cookieparser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import businessRoutes from "./routes/business.routes.js"
import customerRoutes from "./routes/customer.routes.js"


const app = express();

app.use(express.json())
app.use(cookieparser())

app.use("/api/auth", authRoutes)
app.use("/api/create", userRoutes)
app.use("/api", businessRoutes)
app.use("/api", customerRoutes)


export default app