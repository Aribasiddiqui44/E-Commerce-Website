const { Router } = require('express');
const {
    getOrdersOfUser,
    postPlaceOrder
    } = require('./../controllers/order.controller.js');


const verifyJWT = require('./../middlewares/auth.middleware.js');

const router = Router();

router.get("/get", verifyJWT, getOrdersOfUser);
router.post("/place",verifyJWT, postPlaceOrder);

module.exports = router;