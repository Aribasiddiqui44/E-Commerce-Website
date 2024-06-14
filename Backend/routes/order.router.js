const { Router } = require('express');
const {
    getOrdersOfUser,
    postPlaceOrder
    } = require('./../controllers/order.controller.js');

const router = Router();

router.get("/getOrders", getOrdersOfUser);
router.post("/post", postPlaceOrder);

module.exports = router;