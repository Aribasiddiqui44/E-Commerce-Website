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

const getOrdersOfUser = asyncHandler( async (req, res) => {
    // get order from order Id.
});

const getOrderHistory = asyncHandler( async (req, res) => {
    // get history of orders by user.
});

const postPlaceOrder = asyncHandler( async (req, res) => {
    const { cartId, shippingAddress, couponIdApplied } = req.body;
    if ( !cartId ){
        throw new ApiError(
            400,
            "Bad Request, need the cartId"
        );
    };
    // take cart
    // place the products of cart in order
    // make payment object with payment amount of order.
    // check if the shipping address provided.
    // check if the user is already having a shipping address in user model.
    // add that shipping address either coming or from user to order , which was present.
    // then add that payment object to the newly created order.
    // then empty the cart 
    // add these products to user's purchased products array, if not initiated as of now, then initiate it and add these elements.
    // return the response with this order object.
    
    // let cart = await Cart.findById(cartId);

    let cart = await Cart.aggregate([
        {
            $match: {
                _id: cartId
            }
        },
        {
            $unwind: "$productsList"
        },
        {
            $lookup: {
                from: "products",
                localField: "productsList.productId",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $group: {
                _id: "$_id",
                customerId: {
                    $first : "$customerId"
                },
                productsList: {
                    $push: {
                        productId: "$productsList.productId",
                        quantity: "$productsList.quantity",
                        totalCost: "$productsList.totalCost",
                        isAvailable: "$productsList.isAvailable",
                        dateAdded: "$productsList.dateAdded",
                        productDetails: "$productsList.productDetails"
                    }
                },
                totalPriceOfProductsInCart: {
                    $first: "$totalPriceOfProductsInCart"
                },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "updatedAt" }
            }
        }
    ]);

    if ( cart.length === 0 ){
        throw new ApiError(
            400,
            "Bad Request, the cart is empty"
        );
    };

    let user = await User.findById(req.user._id).select(
        "-password -refreshToken"
    );

    if ( !user.shippingAddress && !shippingAddress ) {
        throw new ApiError(
            400,
            "Bad Request, User should provide the shipping address"
        );
    };

    const orderShippingAddress = ( shippingAddress ) ? shippingAddress : user.shippingAddress[user.shippingAddress?.length - 1];

    // now do other checking and also modify user model for shipping address 

    let order = new Order({
        customerId: user._id,
        shippingAddress: {
            address: orderShippingAddress.address,
            postalCode: orderShippingAddress.postalCode,
            otherInformation: ( orderShippingAddress.otherInformation ) ? orderShippingAddress.otherInformation : undefined
        },
        paymentStatus: "unpaid"
    });

    for (let product of cart[0].productsList) {
        let productPurchased = await Product.findOne(
            { _id: product.productId },
            { isAvailable: true }
        );
        if ( !productPurchased ) {
            throw new ApiError(
                400,
                `Bad Request, ${product.productId} is not available.`
            );
        };

        if ( productPurchased.quantity < product.quantity ) {
            throw new ApiError(
                400,
                `Bad Request, ${productPurchased.Title}'s required quantity is not available in stock.`
            )
        };
        productPurchased.quantity -= product.quantity;


        order.products.push(
            {
                productId: product.productId,
                productTitle: productPurchased.Title,
                rate: productPurchased.price,
                quantity: product.quantity

            }
        );

        await productPurchased.save();
        
        if ( !user.purchasedProducts ) {
            user.purchasedProducts = [
                {
                    productId: product.productId
                }
            ]
        } else {
            user.purchasedProducts.push(
                {
                    productId: product.productId
                }
            )
        }
        
    }
    
    await user.save();

});


module.exports = {
    getOrdersOfUser,
    postPlaceOrder
};