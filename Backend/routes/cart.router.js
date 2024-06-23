const Cart = require('./../models/cart.model.js');
const { Router } = require('express');
const {
    getCartContents,
    postCreateCart,
    patchAddOrChangeProducts,
    deleteCart
    } = require('./../controllers/cart.controller.js');

const verifyJWT = require('./../middlewares/auth.middleware.js');
 
const router = Router();

router.get("/get", verifyJWT, getCartContents);
router.post("/post", verifyJWT, postCreateCart);
router.patch("/patch", verifyJWT, patchAddOrChangeProducts);
router.delete("/delete", verifyJWT, deleteCart);

module.exports = router;