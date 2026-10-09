import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGOOSE_URI)
        .then(() => {
    console.log("Database connected successfully");
        })

    } catch (error) {
        console.log("Database connection error:", error);
        
    }
    
}

export default connectDB