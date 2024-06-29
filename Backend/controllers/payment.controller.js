const Payment = require('./../models/payment.model.js');
const Order = require('./../models/order.model.js');
const User = require('./../models/user.model.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');

const getPaymentDetails = async (req, res) => {
    // get details of a payment document throyugh its id or order id.
};
const postMakePayment = asyncHandler( async (req, res) => {
    // take order id, form this take price, etc. 
    // now take the information from frontend, like token information coz we are using Stripe, and for waalet also save tokens.
    // then save his information.
    const { orderId, paymentMethod, paymentSuccessToken } = req.body;

    let order = await Order.findById(orderId);
    if ( !order ){
        throw new ApiError(
            400,
            "Bad Request! no order found"
        );
    };
    if ( order.customerId != req.user._id ) {
        throw new ApiError(
            401,
            "Unauthorized request"
        );
    };

    let newPayment = await Payment.create({
        userId: req.user._id,
        orderId,
        amountPayed: order.totalAmountAfterDiscountAfterTax,
        paymentMethod,
        status: "Success",
        token: paymentSuccessToken
    });
    
    let checkPayment = await Payment.findById(newPayment._id).select("-token");
    if ( !checkPayment ) {
        throw new ApiError(
            500,
            "Internal Server Error! Something went wrong when adding Payment"
        );
    };

    order.paymentId = newPayment._id;
    await order.save(
        {
            validateBeforeSave: false
        }
    );

    res.status(201).json(
        new ApiResponse(
            201,
            checkPayment,
            "Payment made successfully"
        )
    )

});
const patchChangeStatus = async (req, res) => {
    // ig it will not be applicable in our case.
};


module.exports = {
    getPaymentDetails,
    postMakePayment,
    patchChangeStatus
};