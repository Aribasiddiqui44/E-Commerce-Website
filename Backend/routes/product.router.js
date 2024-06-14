const { Router } = require('express');
const {
    getProducts,
    getProductInfo,
    postAddProduct,
    patchChangeProductField,
    deleteProduct 
    } = require('./../controllers/product.controller.js');

const router = Router();

router.get("/getall", getProducts);
router.get("/getinfo", getProductInfo);
router.post("/post", postAddProduct);
router.patch("/patch", patchChangeProductField);
router.delete("/delete", deleteProduct); //only for authorized user mean admin or seller.

module.exports = {
    router
}