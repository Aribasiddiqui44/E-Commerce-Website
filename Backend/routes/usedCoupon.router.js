const { Router } = require('express');
const {
    postUseCoupon,
    getUsedCoupons
    } = require('./../controllers/usedCoupon.controller.js');

const router = Router();

router.get("/get", getUsedCoupons);
router.post("/post", postUseCoupon);

module.exports = router;