import mongoose, {Schema} from "mongoose";

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
    },
    discountValue: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    minOrderValue: {
        type: Schema.Types.Decimal128,
        default: null
    },
    maxDiscountAmount: {
        type: Number,

    },
    isActive: {
        type: Boolean,
        default: true
    }
    //thinking that can we also store the admin reference who is adding these coupons., for tracking.
},{
    timestamps: true
});

export const Coupon = mongoose.model("Coupon", couponSchema);