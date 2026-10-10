import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true
    },

    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        },

        productName: {
           type: String,
           required: true
        },

        quantity: {
        type: Number,
        required: true,
        min: 1
        },

        unitPrice: {
        type: Number,
        required: true,
        min: 0
        }
    }],

    totalAmount: {
        type: Number,
        required: true
    },

    amountPaid: {
        type: Number,
        required: true,
        default: 0
    },

    paymentStatus: {
        type: String,
        enum: {
            values: ["paid", "unpaid", "partially_paid"],
            message: "payment status can be paid, unpaid or partially_paid"
        },
        default: "unpaid"
    },

    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business"
    }
}, {
    timestamps: true
})

const saleModel = mongoose.model("sale", saleSchema)

export default saleModel