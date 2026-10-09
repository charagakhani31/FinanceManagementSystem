import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "customer name is required"]
    },

    customerEmail: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        unique: [true, "email should be unique"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/]
    },

    phone: {
        type: Number,
        required: [true, "phone is required"]
    },

    address: {
        type: String,
        required: [true, "address is required"]
    },

    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"business"
    }
}, {
    timestamps: true
})

const customerModel = mongoose.model("customer", customerSchema);

export default customerModel