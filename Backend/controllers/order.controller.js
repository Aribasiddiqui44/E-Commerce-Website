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

// Extracted function to fetch the user
const fetchUserById = async (userId) => {
    return await User.findById(userId).select("-password -refreshToken");
};

// Extracted function to initialize the order
const initializeOrder = async (user) => {
    return new Order({
        customerId: user._id,
        paymentStatus: "unpaid",
        products: []
    });
};

// Extracted function to handle all product logic for the order
const handleProductsForOrder = async (products, order, user) => {
    for (let product of products) {
        let productPurchased = await validateProductAvailability(product._id);
        validateProductQuantity(productPurchased, product.quantity);
        
        updateProductStock(productPurchased, product.quantity);
        
        addProductToOrder(order, productPurchased, product.quantity);
        
        await productPurchased.save({ validateBeforeSave: false });
        updateUserPurchasedProducts(user, productPurchased);
    }
};

// Extracted function to check product availability
const validateProductAvailability = async (productId) => {
    let productPurchased = await Product.findOne({ _id: productId, isAvailable: true });
    
    if (!productPurchased) {
        throw new ApiError(400, `Bad Request, ${productId} is not available.`);
    }
    
    return productPurchased;
};

// Extracted function to validate product quantity
const validateProductQuantity = (productPurchased, requiredQuantity) => {
    if (productPurchased.quantity < Number(requiredQuantity)) {
        throw new ApiError(
            400,
            `Bad Request, ${productPurchased.title}'s required quantity is not available in stock.`
        );
    }
};

// Extracted function to update product stock
const updateProductStock = (productPurchased, quantity) => {
    productPurchased.quantity -= Number(quantity);
};

// Extracted function to add product to order
const addProductToOrder = (order, productPurchased, quantity) => {
    order.products.push({
        productId: productPurchased._id,
        productTitle: productPurchased.title,
        rate: productPurchased.price,
        quantity: Number(quantity)
    });
};

// Extracted function to update user's purchased products
const updateUserPurchasedProducts = (user, productPurchased) => {
    if (!user.purchasedProducts) {
        user.purchasedProducts = [{ productId: productPurchased._id }];
    } else {
        user.purchasedProducts.push({ productId: productPurchased._id });
    }
};

// Extracted function to finalize order amounts
const finalizeOrderAmounts = (order, amountBeforeTax, totalAfterTax) => {
    order.totalAmountBeforeTaxWithoutDiscount = amountBeforeTax;
    order.totalAmountAfterTax = totalAfterTax;
};

// Extracted function to validate order placement
const validateOrderPlacement = async (order) => {
    let checkOrder = await Order.findById(order._id);
    
    if (!checkOrder) {
        throw new ApiError(500, "Internal Server Error! Something went wrong when placing the order. Please try again.");
    }
};


const postPlaceOrder = asyncHandler(async (req, res) => {
    const { shippingAddress, products, amountBeforeTax, totalAfterTax } = req.body;
    
    let user = await fetchUserById(req.user._id);
    
    let order = await initializeOrder(user);
    
    await handleProductsForOrder(products, order, user);

    finalizeOrderAmounts(order, amountBeforeTax, totalAfterTax);

    await user.save({ validateBeforeSave: false });
    await order.save();

    await validateOrderPlacement(order);

    res.status(201).json({
        status: 201,
        order,
        message: "Order placed successfully"
    });
});

module.exports = {
    getOrdersOfUser,
    postPlaceOrder
};