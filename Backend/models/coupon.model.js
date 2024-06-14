// import mongoose, {Schema} from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

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

couponSchema.pre("save", async function(next){
    try{
        let currentDate = new Date();
        let futureDate = new Date(currentDate);
        this.expiryDate = futureDate.setMonth(futureDate.getMonth() + 2);

        next();

    } catch(error){
        next(error);
    }
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;