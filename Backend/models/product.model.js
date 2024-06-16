const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
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
        required: false,
        unique: true,
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
    productImageUrl: {
        type: String,
        required: true,
        unique: true,
    },
    features: [
        {
            type: String,
            trim: true
        }

    ],
    productQuantity: {
        type: Number,
        required: true,
    },
    productSeller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isAvaiable: {
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
                required: true,
                trim: true,

            }

        }
    ]

},
{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;