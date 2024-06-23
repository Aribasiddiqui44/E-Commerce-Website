const Cart = require('./../models/cart.model.js');
const Product = require('./../models/product.model.js');
const User = require('./../models/user.model.js');

const asyncHandler = require('./../utils/asyncHandler.js');
const ApiResponse = require('./../utils/ApiResponse.js');
const ApiError = require('../utils/ApiError.js');

const getCartContents = asyncHandler( async (req, res) => {
    const cart = await Cart.findOne({ customerId: req.user._id });

    res.status(200).json(
        new ApiResponse(
            200,
            cart,
            (cart.length === 0) ? "No products in cart" : "Success"
        )
    );

});

const postCreateCart = async (req, res) => {
    const { productId } = req.body;

    const existedCart = await Cart.findOne({ customerId: req.user._id });
    if ( existedCart ) {
        throw new ApiError(
            400,
            "Bad Request! Cart already exist for this user."
        )
    };

    const product = await Product.findById(productId);

    const newCart = await Cart.create({
        customerId: req.user._id,
        productsList: [
            {
                productId,
                quantity: product.quantity,
                totalCost: product.quantity * product.price,
                isAvailable: product.isAvailable
            }
        ]
    });

    const checkCart = await Cart.findById(newCart._id);
    
    if ( !checkCart ) {
        throw new ApiError(
            500,
            "Internal Server Error! Something went wrong when creating cart on cloud"
        )
    };

    res.status(200).json(
        new ApiResponse(
            200,
            checkCart,
            "Cart created successfully"
        )
    );
};
const patchAddOrChangeProducts = async (req, res) => {

};
const deleteCart = async (req, res) => {

};

module.exports = {
    getCartContents,
    postCreateCart,
    patchAddOrChangeProducts,
    deleteCart
}
