const Cart = require('./../models/cart.model.js');
const Product = require('./../models/product.model.js');
const User = require('./../models/user.model.js');

const asyncHandler = require('./../utils/asyncHandler.js');
const ApiResponse = require('./../utils/ApiResponse.js');
const ApiError = require('../utils/ApiError.js');

const getCartContents = asyncHandler( async (req, res) => {
    // const cart = await Cart.findOne({ customerId: req.user._id });

    const cart = await Product.aggregate([
        {
            $match: {
                customerId: req.user._id
            }
        },
        {
            '$unwind': '$productsList'
        },
        {
            $lookup: {
                from: 'products',           // The collection to join
                localField: 'productsList.productId',    // Field from the orders collection
                foreignField: '_id',         // Field from the customers collection
                as: 'productInfo'           // Output array field
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "productsList": {
                    "$push": {
                        "product": "$products",
                        "productInfo": "$productInfo"
                    }
                }
            }
        },
    ]);
    res.status(200).json(  
        new ApiResponse(
            200,
            cart,
            (cart.productsList.length === 0) ? "No products in cart" : "Success"
        )
    );

});

const postCreateCart = asyncHandler( async (req, res) => {
    const { productId, quantity } = req.body;

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
                quantity,
                totalCost: quantity * product.price,
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
});
const patchAddProduct = asyncHandler( async (req, res) => {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne(
        {customerId: req.user._id}
    );
    // if ( cartId.customerId != req.user._id ) {
    //     throw new ApiError(401, "Unauthorized Request")
    // };
    let product = await Product.findById(productId);
    cart.productsList.push(
        {
            productId,
            quantity,
            totalCost: quantity * product.price,
            isAvailable: product.isAvailable
        }
    );
    await cart.save();

    let checkChangeInCart = await Cart.findOne(
        {
            customerId: req.user._id,
            'productsList.productId': productId
        }
    );

    if ( !checkChangeInCart ) {
        throw new ApiError(
            500,
            "Internal Server Error! Something went wrong when adding product to cart, try again."
        );
    };

    res.status(200).json(
        new ApiResponse(
            200,
            checkChangeInCart,
            "Product added in cart successfully"
        )
    )

});

const patchRemoveProductFromCart = asyncHandler( async (req, res) => {
    const { productId } = req.body;
    
    // let cart = await Cart.findOne(
    //     {
    //         customerId: req.user._id,
    //         'productsList.productId': productId
    //     }
    // );

    let cart = await Cart.findOneAndUpdate(
        { customerId: req.user._id },
        {
            $pull: {
                productsList: { productId }
            }
        },
        { new: true }
    ); // A/C to chat this method will not call the pre save method of the model, it will be called only when we .save(), or .create(), etc.
    // SO here if we go with this approach then we have to calculate totalCost seperately.
    // else we can go for .save() and remove the product manually.
     

    if ( !cart ) { 
        throw new ApiError(400, "Bad Request! The product is already removed from cart");
    };


})
const deleteCart = async (req, res) => {

};

module.exports = {
    getCartContents,
    postCreateCart,
    patchAddProduct,
    patchRemoveProductFromCart,
    deleteCart
}
