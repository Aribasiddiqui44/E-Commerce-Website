const asyncHandler = require('./../utils/asyncHandler');

const verifyJWT = asyncHandler ( async (req, res, next) => {
    // req.cookies.accessToken;
    // req.cookies.refresfToken;
    const { accessToken, refreshToken } = req.cookies;

});

module.exports = verifyJWT;