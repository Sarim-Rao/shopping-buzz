import mongoose from "mongoose";


const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "Email already exist"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    })


const userModel = mongoose.model("user", userShema);

export default userModel