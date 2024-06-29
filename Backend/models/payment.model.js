// import mongoose, {Schema} from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true 
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        index: true,
    },
    amountPayed: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    paymentMethod: { // Card, Stripe, Blockchain wallet etc
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    status: { //Pending, Completed, Failed, Avaiting Verification in case of Blockchain based payment or Stripe
        type: String,
        required: true,
        trim: true
    },
    cardDetails: { // Only for card usage.
        cardType: {
            type: String,
            trim: true
        },
        lastFourNumbersOfAccountNumber: {
            type: String,
            trim: true
        },
        expiryMonth: {
            type: Number,
            min: 1,
            max: 12,
            default: 12
        },
        expiryYear: {
            type: Number,
            
        },
        cvvVerified: {
            type: Boolean
        }
    },
    token: { // for Stripe or Blockchain based payments.
        dtype: String
        // default: null
    }
},{
    timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;