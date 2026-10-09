import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: [true, "business name is required for creating business"]
    },

    businessEmail: {
        type: String,
        required: [true, "business email is required for creating business"],
        unique: [true, "email should be unique"],
        trim:true,
        lowercase:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/]
    },

    phone: {
        type: Number,
        required: [true, "phone is required for creating business"],
    },

    address: {
        type: String,
        required: [true, "address is required for creating business"],
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    }
}, {
    timestamps: true
})

const businessModel = mongoose.model("business", businessSchema)

export default businessModel