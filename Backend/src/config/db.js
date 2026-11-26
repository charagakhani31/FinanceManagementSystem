import mongoose from "mongoose";


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