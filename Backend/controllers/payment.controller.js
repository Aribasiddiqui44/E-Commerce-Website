const Payment = require('./../models/payment.model.js');
const Order = require('./../models/order.model.js');
const User = require('./../models/user.model.js');

const getPaymentDetails = async (req, res) => {
    // get details of a payment document throyugh its id or order id.
};
const postMakePayment = async (req, res) => {
    // take order id, form this take price, etc. 
    // now take the information from frontend, like token information coz we are using Stripe, and for waalet also save tokens.
    // then save his information.
};
const patchChangeStatus = async (req, res) => {
    // ig it will not be applicable in our case.
};


module.exports = {
    getPaymentDetails,
    postMakePayment,
    patchChangeStatus
};