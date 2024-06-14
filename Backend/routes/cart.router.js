const Cart = require('./../models/cart.model.js');
const { Router } = require('express');
const {
    getCartContents,
    postCreateCart,
    patchAddOrChangeProducts,
    deleteCart
    } = require('./../controllers/cart.controller.js');


 
const router = Router();

router.get("/get", getCartContents);
router.post("/post", postCreateCart);
router.patch("/patch", patchAddOrChangeProducts);
router.delete("/delete", deleteCart);

module.exports = router;