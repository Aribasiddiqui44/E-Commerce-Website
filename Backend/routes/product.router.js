const { Router } = require('express');
const {
    getProducts,
    postProductSearch,
    getProductInfo,
    postAddProduct,
    patchAddFeatures,
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

router.get("/get/info", getProductInfo);
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
router.patch("/patch/features", verifyJWT, patchAddFeatures);
router.patch("/patch/availability", verifyJWT, patchChangeAvailabilityOfProduct); //only for authorized user mean admin or seller.

module.exports = router;