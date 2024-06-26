// import mongoose, {Schema} from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    products: [
        {
            type: Schema.Types.ObjectId, // to reference an object
            ref: "Product",
            required: true
        }
    ]
},{
    timestamps: true
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;