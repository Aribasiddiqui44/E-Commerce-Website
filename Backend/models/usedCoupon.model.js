// import mongoose, { Schema } from 'mongoose';
const mongoose = require("mongoose");
const { Schema } = mongoose;

const usedCouponSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    couponId: {
        type: Schema.Types.ObjectId,
        ref: "Coupon"
    },
    usedAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

const UsedCoupon = mongoose.model("UsedCoupon", usedCouponSchema);

module.exports = UsedCoupon;