const { Router } = require('express');
const {
    getProducts,
    postProductSearch,
    getProductInfo,
    postAddProduct,
    patchChangeProductField,
    patchChangeAvailabilityOfProduct 
    } = require('./../controllers/product.controller.js');

const upload = require('./../middlewares/multer.middleware.js');
const verifyJWT = require('./../middlewares/auth.middleware.js');
const router = Router();

router.get("/getall", getProducts);

router.route(
    "/search"
).post( 
    postProductSearch
);

router.get("/getinfo", getProductInfo);
// router.post("/post", postAddProduct);
router.route("/post").post(
    verifyJWT,
    upload.fields([
        {
            name: "productImage",
            maxCount: 1
        }
    ]),
    postAddProduct
)
router.patch("/patch", patchChangeProductField);
router.patch("/changeAvailability", patchChangeAvailabilityOfProduct); //only for authorized user mean admin or seller.

module.exports = router;