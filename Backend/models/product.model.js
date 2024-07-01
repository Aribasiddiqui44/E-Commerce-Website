const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
const productSchema = new Schema({
    //title
    //description
    // brand - optional
    title: {
        type: String,
        required: true,
        unique: false,
        lowercase: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        unique: false,
        lowercase: true,
        trim: true,
        default: "No description about the product."
    },
    brand: {
        type: String,
        // required: false, 
        unique: false,
        lowercase: true,
        trim: true,
        default: "No"
    },
    price: {
        type: Number,
        required: true,
        unique: false,
        trim: true,
        index: true,
        default: "No"
    },
    category: {
        type: String,
        default: "no"
    },
    color: {
        type: String,
        default: "Not Specified"
    },
    productImageUrl: {
        type: String,
        required: true,
        unique: false,
    },
    features: [
        {
            type: String,
            trim: true
        }

    ],
    // productQuantity:
    quantity: {
        type: Number,
        required: true,
    },
    productSeller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    // sku: {
    //     price: {},
    //     quantity: {

    //     },
    //     description: {}
    // },
    feedbacks: [
        {
            customerId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            feedback: {
                type: String,
                // required: true,
                trim: true,

            }

        }
    ]

},
{
    timestamps: true
})

productSchema.plugin(mongooseAggregatePaginate);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;