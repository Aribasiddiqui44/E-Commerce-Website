const Order = require('./../models/order.model.js');
const User = require('./../models/user.model.js');
const Product = require('./../models/product.model.js');
const Coupon = require('./../models/coupon.model.js');
const Payment = require('./../models/payment.model.js');
const UsedCoupon = require('./../models/usedCoupon.model.js');
const Cart = require('./../models/cart.model.js');
const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');

const getOrdersOfUser = async (req, res) => {
// get order from order Id.
};

const getOrderHistory = asyncHandler( async (req, res) => {
    // get history of orders by user.
});

const postPlaceOrder = async (req, res) => {
    const { cartId } = req.body;
    if ( !cartId ){
        throw new ApiError(
            400,
            "Bad Request, need the cartId"
        );
    };
    // take cart
    // place the products of cart in order
    // make payment object with payment amount of order.
    // then add that payment object to the newly created order.
    // then empty the cart 
    // add these products to user's purchased products array, if not initiated as of now, then initiate it and add these elements.
    // return the response with this order object.
    
    let cart = await Cart.findById(cartId);

};


module.exports = {
    getOrdersOfUser,
    postPlaceOrder
};