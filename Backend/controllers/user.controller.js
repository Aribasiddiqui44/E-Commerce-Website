const User = require('../models/user.model.js');
const asyncHandler  = require('./../utils/asyncHandler.js');

const getUserData = async (req, res) => {

};

 const postRegisterUser = asyncHandler( async (req, res) => {
    // get user details from frontend.
    // validation - not empty
    // check if user already exists - username and email
    // check for images, check for avatar upload file
    // upload the images on cloudinary, avatar
    // create user object - create entry in db
    // remover password and refresh token field from response
    // check for user creation
    // return res

    //getting user details from frontend
    const { fullName, email, password, username} = req.body;
    console.log("email:", email);
    res.status(200).end();
 });

 const putChangeUserInfo = async (req, res) => {

 };

 const deleteUserProfile = async (req, res) => {

 };


module.exports = {
    getUserData,
    postRegisterUser,
    putChangeUserInfo,
    deleteUserProfile
};