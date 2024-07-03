// import mongoose, {Schema} from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

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
        // required: true,
        unique: true,
    },
    orderStatus: { // Processing, Dispatched, Shipped, On the way, Delivered  or Cancelled.
        type: String,
        default: "Processing"
        
    },
    products: [
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
                required: true,

            },
            quantity: {
                type: Number,
                default: 1,
                
            },
            // priceBeforeDiscount: {
            //     type: Schema.Types.Decimal128
            // },
            preTaxPrice: { // after discount
                type: Schema.Types.Decimal128
                
            },
            afterTaxPrice: {
                type: Schema.Types.Decimal128
                
            },
            // totalCost: {
                //     type: Schema.Types.Decimal128,
                //     required: true
                // }
            }
        ],
        discount: { // in %
            type: Schema.Types.Decimal128,
            default: 0.0
        },

    shippingAddress: {
        // Order is delivered at this address , it will always be static , will never change, even if shipping address in user's profiel changed.
        //  the shipping address in user's profiel if for providing ease of use, if user wants to use that, he can directly use that address.
        // houseNumber: {
        //     type: String,
        //     required: true,
            
        // }, city: {
        //     type: String,
        //     required: true,
        // }, postalCode: {
        //     type: Number,
        //     required: true
        // }, country: {
        //     type: String,
        //     required: true
        // }, otherInformation: {
        //     type: String,
        //     trim: true,          
        // }
        address: {
            type: String,
            // requried: true,
            trim: true
        },
        postalCode: {
            type: Number,
            // required: true
        },
        otherInformation: {
            // such as near ____ building, etc.
            type: String,
            trim: true
        }
    },
    orderPlacedAt: {
        type: Date,
        default: Date.now
    },
    totalAmountBeforeTaxWithoutDiscount: {
        type: Schema.Types.Decimal128,

    },
    totalAmountAfterTax: {
        type: Schema.Types.Decimal128
    },
    totalAmountAfterDiscountAfterTax: {
        type: Schema.Types.Decimal128
    },
    paymentStatus: {
        type: String, // paid and unpaid
        // required: true,
    },
    trackingNumber: {
        type: String,
        default: "Not given yet."
    }

},
{
    timestamps: true
});

const Tax_rate = 17;
// orderSchema.pre("save", async function(next){
//     try{
//         this.totalAmountBeforeTaxWithoutDiscount = 0.0;
//         // this.total
//         // this should be changed as we have chnaged the model.
//         for(product of this.Products){
//             let rate = parseFloat(product.rate.toString());
//             // let discount = parseFloat(product.discount ? product.discount.toString() : '0');
//             // product.priceBeforeDiscount = rate*product.quantity;
            
//             product.preTaxPrice = rate*product.quantity;
            
//             product.afterTaxPrice = product.preTaxPrice * (1 + Tax_rate);
//             this.totalAmountBeforeTaxWithoutDiscount += product.preTaxPrice;
//         }
//         this.totalAmountAfterTax = this.totalAmountBeforeTaxWithoutDiscount*(1+Tax_rate);

//         let discountAmount = (this.discount/100)*product.this.totalAmountAfterTax;
//         // this.discount = discountAmount;
//         this.totalAmountAfterDiscountAfterTax = this.totalAmountAfterTax - discountAmount;


//         // const totalAmount = this.Products.reduce((sum, product) => {
//         //     return sum + parseFloat(product.afterTaxPrice.toString());
//         // }, 0);

//         // this.totalAmount = totalAmount;

//         next();
//     }catch(error){
//         next(error);
//     }
// });
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;