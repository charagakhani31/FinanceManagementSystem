import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: [true, "name is required"]
    },

    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/]
    },

    phone: {
        type: Number,
        required: [true, "phone number is required"]
    },

    address: {
        type: String,
        required: [true, "address is required"]
    },

    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business"
    }
}, {
    timestamps: true
})

const vendorModel = mongoose.model("vendor", vendorSchema)

export default vendorModel