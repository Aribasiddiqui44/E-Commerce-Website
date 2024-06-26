const ApiError = require('../utils/ApiError');
const asyncHandler = require('./../utils/asyncHandler');
const jwt = require("jsonwebtoken");
const User = require('./../models/user.model.js');

const verifyJWT = asyncHandler ( async (req, res, next) => {
    // req.cookies.accessToken;
    // req.cookies.refresfToken;
    // const { accessToken, refreshToken } = req.cookies;
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const cookieRefreshToken = req.cookies?.refreshToken;
        if ( !token ) {
            if( !cookieRefreshToken ){
                throw new ApiError(401, "Unauthorized request! please login");

            } else {
                let decodedRefreshToken = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET);

                let user = await User.findById(decodedRefreshToken._id).select(
                    "-password -refreshToken"
                );
                let accessToken = user.generateAccessToken();

                // creating and configuring cookie
                const options = {
                    httpOnly: true,
                    secure: true
                };
                req.user = user;

                res.cookie("accessToken", accessToken, options);

                return next();
            }
        };
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("decoded Token : ", decodedToken);
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        };
    
        req.user = user;
        return next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

module.exports = verifyJWT;