import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "fullName is required to create user"]
    },

    email: {
        type: String,
        required:[true, "email is required to create user"],
        unique: [true, "email should be unique"],
        trim:true,
        lowercase:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/]
    },

    password: {
        type: String,
        required: [true, "password is required to create user"],
        minlength: [6, "length should be greater then 6"],
        select: false
    },
    role: {
        type: String,
        enum: {
            values: ["owner", "manager", "employee"],
            message: "role can be owner, manager or employee"
        },
        default: "owner"
    },

    isActive: {
        type: Boolean,
        default: true
    },

    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business",
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema);

export default userModel