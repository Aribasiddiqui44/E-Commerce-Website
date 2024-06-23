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
