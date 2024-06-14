const { Router } = require('express');
const {
    getCoupons,
    getCouponInformation,
    postAddCoupon,
    patchChangeCouponAvailability,
    patchAvailCoupon
    } = require('./../controllers/coupon.controller.js');

const router = Router();

router.get("/getAll", getCoupons);
router.get("/getInfo", getCouponInformation);
router.post("/post", postAddCoupon);
router.patch("/patchClose", patchChangeCouponAvailability);
router.patch("/patchAvail", patchAvailCoupon);

module.exports = router;