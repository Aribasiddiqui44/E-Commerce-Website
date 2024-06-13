import mongoose, { Schema } from 'mongoose';

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

export const UsedCoupon = mongoose.model("UsedCoupon", usedCouponSchema);