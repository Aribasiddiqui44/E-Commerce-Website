import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
        unique: true,
    },
    orderStatus: { // Processing, Packing, Shipped, Delivery, Delivered.
        type: String,
        default: "Processing"
    },
    Products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,

            },
            productTitle: {
                type: String,
                required: true,
                index: true,
            },
            rate: {
                type: Schema.Types.Decimal128,
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                
            },
            discounts: {
                type: Schema.Types.Decimal128,    
            },
            preTax: {
                type: Schema.Types.Decimal128

            },
            afterTax: {
                type: Schema.Types.Decimal128

            },
            totalCost: {
                type: Schema.Types.Decimal128,
                required: true
            }
        }
    ],
    shippingAddress: {
        // Order is delivered at this address , it will always be static , will never change, even if shipping address in user's profiel changed.
        //  the shipping address in user's profiel if for providing ease of use, if user wants to use that, he can directly use that address.
        houseNumber: {
            type: String,
            required: true,
            
        }, city: {
            type: String,
            required: true,
        }, postalCode: {
            type: Number,
            required: true
        }, country: {
            type: String,
            required: true
        }, otherInformation: {
            type: String,
            trim: true,
            
        }
    },
    orderPlacedAt: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Schema.Types.Decimal128
    },
    paymentStatus: {
        type: String, // paid and unpaid
        required: true,
    },

},
{
    timestamps: true
});

export const Order = mongoose.model("Order", orderSchema)