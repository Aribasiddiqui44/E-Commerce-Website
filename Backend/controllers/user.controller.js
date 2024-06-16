const User = require('../models/user.model.js');

const asyncHandler  = require('./../utils/asyncHandler.js');
const ApiError = require('./../utils/ApiError.js');
const ApiResponse = require('./../utils/ApiResponse.js');

const uploadOnCloudinary = require('./../services/cloudinary.service.js');

const generateAccessAndRefreshTokens = async (userId) => {
    try{
        let user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        });

        return {
            accessToken,
            refreshToken
        };

    } catch (error){
        throw new ApiError(500, "Something went wrong while generating tokens(access and refresh)");
    }
};


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
    //ALGO
    // req body -> data
    // username or email
    // find the user
    // password check
    // generate access and refresh token 
    // send cookie

    // console.log(req.body)
    const {username, password, email} = req.body;
    // const username = req.body.username;
    // const 

    if (!username && !email){
        throw new ApiError(400, "username or email is required");
    };

    const user = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if (!user){
        throw new ApiError(404, "User does not exist");
    };

    const isPasswordValid = await user.passwordValidator(password);

    if (!isPasswordValid){
        // if password is invalid
        throw new ApiError(401, "Invalid user credentials")
    };

    // for generating access and refresh tokens.
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // taking logged in user for sending back the response.
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // creating and configuring cookie
    const options = {
        httpOnly: true,
        secure: true
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )


 });

const logoutUser = asyncHandler( async (req, res) => {

});
 const patchChangeUserInfo = async (req, res) => {

 };

 const deleteUserProfile = async (req, res) => {

 };


module.exports = {
    getUserData,
    postLoginUser,
    logoutUser,
    postRegisterUser,
    patchChangeUserInfo,
    deleteUserProfile
};