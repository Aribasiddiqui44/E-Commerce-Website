const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');
const Coupon = require('./../models/coupon.model.js');
const User = require('./../models/user.model.js');

const getCoupons = async (req, res) => {
    // get All coupons
    let coupons = await Coupon.find(
        {isActive: true}
    );

    res.status(200).json(
        new ApiResponse(
            200,
            coupons
        )
    )
};
const getCouponInformation = async (req, res) => {

};

const postAddCoupon = asyncHandler( async (req, res) => {
    const { code, discountType, discountValue, minOrderValue, maxDiscountAmount } = req.body;

    if( !req.user.isAdmin ) { // if user is not admin
        throw new ApiError(401, "Unauthoried requet ! Only admin can add discount coupons");
    };

    if (
        [ code, discountValue, discountType ].some(field => field.trim() === "")
    ) {
        throw new ApiError(400, "Bad Request! Provide necessary fields.");
    };

    const existedCoupon = await Coupon.findOne({code});
    if ( existedCoupon ){
        throw new ApiError(400, "Bad Request! A coupon with this code already existed, use some other coupon code.");
    };

    let newCoupon;
    if ( !minOrderValue && !maxDiscountAmount){
        newCoupon = await Coupon.create({
            code,
            discountType,
            discountValue
        });
    } else if ( !maxDiscountAmount ){
        newCoupon = await Coupon.create({
            code,
            discountType,
            discountValue,
            minOrderValue
        });
    } else if ( !minOrderValue ){
        newCoupon = await Coupon.create({
            code,
            discountType,
            discountValue,
            maxDiscountAmount
        });    
    } else {
        newCoupon = await Coupon.create({
            code,
            discountType,
            discountValue,
            maxDiscountAmount,
            minOrderValue
        });
    }

    const verifyCoupon = await Coupon.findById(newCoupon._id);
    if ( !verifyCoupon ){
        throw new ApiError(500, "Internal Server Error! Something went wrong when adding the COupon to Cloud");
    };


    res.status(201).json(
        new ApiResponse(
            200,
            verifyCoupon,
            "Coupon created successfully"
        )
    );
});

const patchChangeCouponAvailability = asyncHandler( async (req, res) => {
    const { couponId } = req.body;
    //checking if admin.
    if ( !req.user.isAdmin ){
        throw new ApiError(401, "Unauthorized request! Only admin can change status");
    };

    let coupon = await Coupon.findById(couponId);
    const beforeChange = coupon.isActive;
    coupon.isActive = !coupon.isActive; 

    await coupon.save(
        { validateBeforeSave: false }
    );

    if ( beforeChange === coupon.isActive ) {
        throw new ApiError(500, "Internal Server Error! Something went wrong when changing the active status of coupon");
    };

    res.status(200).json(
        new ApiResponse(
            200,
            coupon,
            "Status changed successfully."
        )
    );

});

const patchAvailCoupon = async (req, res) => {

};

module.exports = {
    getCoupons,
    getCouponInformation,
    postAddCoupon,
    patchChangeCouponAvailability,
    patchAvailCoupon
};