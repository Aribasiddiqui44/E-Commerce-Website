import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    Products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,

            },
            quantity: {
                type: Number,
                default: 1,

            },
            totalCost: {
                type: Schema.Types.Decimal128,
                required: true
            }
        }
    ],
    orderPlaced: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Schema.Types.Decimal128
    },
    paymentStatus: {
        type: String, // paid and unpaid
        required: true,
    }
},
{
    timestamps: true
});

export const Order = mongoose.model("Order", orderSchema)