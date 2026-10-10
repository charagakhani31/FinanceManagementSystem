import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },

    category: {
        type: String,
        required: [true, "title is required"]
    },

    amount: {
        type: Number,
        required: [true, "title is required"]
    },

    description: {
        type: String,
    },

    date: {
       type: String,
        required: [true, "title is required"]
    },

    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business"
    }
}, {
    timestamps: true
})

const expenseModel = mongoose.model("expense", expenseSchema)

export default expenseModel