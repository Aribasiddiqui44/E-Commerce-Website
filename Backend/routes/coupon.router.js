const { Router } = require('express');
const {
    getCoupons,
    getCouponInformation,
    postAddCoupon,
    patchChangeCouponAvailability,
    patchAvailCoupon
    } = require('./../controllers/coupon.controller.js');

const verifyJWT = require('./../middlewares/auth.middleware.js');
const router = Router();

router.get("/getAll", getCoupons);
router.get("/getInfo", getCouponInformation);
router.post("/post", verifyJWT, postAddCoupon);
router.patch("/patch/status", verifyJWT, patchChangeCouponAvailability);
router.patch("/patchAvail", verifyJWT, patchAvailCoupon);

module.exports = router;