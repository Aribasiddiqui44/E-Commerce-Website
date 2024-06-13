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
    orderStatus: { // Processing, Packing, Shipped, Delivery, Delivered  or Cancelled.
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
                required: true,

            },
            quantity: {
                type: Number,
                default: 1,
                
            },
            priceBeforeDiscount: {
                type: Schema.Types.Decimal128
            },
            discount: { // in %
                type: Schema.Type.Decimal128,
                default: null
            },
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
    trackingNumber: {
        type: String,
        default: "Not given yet."
    }

},
{
    timestamps: true
});

const Tax_rate = 17;
orderSchema.pre("save", async function(next){
    try{
        for(product of this.Products){
            let rate = parseFloat(product.rate.toString());
            let discount = parseFloat(product.discount ? product.discount.toString() : '0');
            product.priceBeforeDiscount = rate*product.quantity;
            let discountAmount = (discount/100)*product.priceBeforeDiscount;
    
            product.preTaxPrice = product.priceBeforeDiscount - discountAmount;
    
            product.afterTaxPrice = product.preTaxPrice * (1 + Tax_rate);
        }
        const totalAmount = this.Products.reduce((sum, product) => {
            return sum + parseFloat(product.afterTaxPrice.toString());
        }, 0);

        this.totalAmount = totalAmount;

        next();
    }catch(error){
        next(error);
    }
})
export const Order = mongoose.model("Order", orderSchema)