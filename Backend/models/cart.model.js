import mongoose, {Schema} from "mongoose";

const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    productsList: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,

            }, quantity: {
                type: Number,
                required: true,
                default: 1
            }, totalCost: {
                type: Number,
                required: true
            },
            dateAdded: {
                type: Date,
                required: true,
                default: Date.now
            }
        }
    ],
    totalPriceOfProductsInCart: {
        type: Schema.Types.Decimal128,
    }       
    
},
{
    timestamps: true
});

export const Cart = mongoose.model("Cart", cartSchema)