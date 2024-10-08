// import mongoose, {Schema} from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true
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
            isAvailable: {
                type: Boolean,
                default: true
            },
            dateAdded: {
                type: Date,
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

//Calculating total cost before saving the order.
cartSchema.pre("save", async function(next){
    let price = 0
    for (product of this.productsList){
        price += product.toalCost;
    }
    this.totalPriceOfProductsInCart = price;
    next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;