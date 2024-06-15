const User = require('../models/user.model.js');

const asyncHandler  = require('./../utils/asyncHandler.js');
const ApiError = require('./../utils/ApiError.js');
const ApiResponse = require('./../utils/ApiResponse.js');

const uploadOnCloudinary = require('./../services/cloudinary.service.js');

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

    if (
        [fullName, email, password, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    };

    //checking if user already exists.
    const existeduser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if(existeduser){
        throw new ApiError(409, "User with email or username already exists.");   
    };

    // now working with upload files, avatar.
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required.");
    };

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if(!avatar){
        throw new ApiError(500, "Internal server error when uploading file, so upload file again.")
    };

    const newUser = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        password,
        username
    });

    //check if user is created.
    let checkUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    );

    if(!checkUser){
        throw new ApiError(500, "Internal Server Error. Something went wrong while creating user on Mongo.")
    };

    return res.status(201).json(
        new ApiResponse(200, checkUser, "User Registered Successfully")
    );

 });

 const postLoginUser = asyncHandler ( async (req, res) => {

 });
 const putChangeUserInfo = async (req, res) => {

 };

 const deleteUserProfile = async (req, res) => {

 };


module.exports = {
    getUserData,
    postLoginUser,
    postRegisterUser,
    putChangeUserInfo,
    deleteUserProfile
};