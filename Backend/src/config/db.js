
import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function connectDB() {
    try {
        if (!process.env.MONGOOSE_URI) {
            throw new Error("MONGOOSE_URI environment variable is missing");
        }

        await mongoose.connect(process.env.MONGOOSE_URI);

        console.log("Database connected successfully");

    } catch (error) {
        console.error("Database connection error:", error.message);
        throw error;
    }
}

export default connectDB;
