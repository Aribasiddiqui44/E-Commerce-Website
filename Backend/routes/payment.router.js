const { Router } = require('express');
const {
    getPaymentDetails,
    postMakePayment,
    patchChangeStatus
    } = require('./../controllers/payment.controller.js');

const router = Router();

router.get("/get", getPaymentDetails);
router.post("/post", postMakePayment);
router.patch("/patch", patchChangeStatus);

module.exports = router;