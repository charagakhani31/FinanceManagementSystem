import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "product name is required"]
    },

    sku: {
        type: String,
        required: [true, "sku is required"],
        unique: [true, "sku should be unique"]
    },

    description: {
        type: String,
    },

    purchasePrice: {
        type: Number,
        required: [true, "purchasePrice is required"],
        min: [0, "can not be a negative"]
    },

    sellingPrice: {
        type: Number,
        required: [true, "sellingPrice is required"],
        min: [0, "can not be a negative"]
    },

    quantity: {
        type: Number,
        required: [true, "quantity is required"],
        min: [0, "can not be a negative"],
        default: 0
    },

    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"business"
    }
}, {
    timestamps: true
})

const productModel = mongoose.model("product", productSchema)

export default productModel