// import mongoose, {Schema} from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        // trim: true
    },
    email: {
        type: String,
        required: true,
        // trim: true  
    },
    message: {
        type: String,
        required: true,
        // trim: true
    }
},{
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;