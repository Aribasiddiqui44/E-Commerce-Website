const User = require('./../models/user.model.js');

const asyncHandler  = require('./../utils/asyncHandler.js');
const ApiError = require('./../utils/ApiError.js');
const ApiResponse = require('./../utils/ApiResponse.js');

const uploadOnCloudinary = require('./../services/cloudinary.service.js');
const Wishlist = require('./../models/wishlist.model.js');
const Cart = require('./../models/cart.model.js');

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

    // if(!avatarLocalPath){
    //     throw new ApiError(400, "Avatar file is required.");
    // };

    // const avatar = await uploadOnCloudinary(avatarLocalPath);

    // if(!avatar){
    //     throw new ApiError(500, "Internal server error when uploading file, so upload file again.")
    // };

    const newUser = await User.create({
        fullName,
        // avatar: avatar.url,
        email,
        password,
        username
    });

    //check if user is created.
    let checkUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    );
    let wishlist = await Wishlist.create(
        {
            userId: checkUser._id,
            products: []
        }
    );
    let cart = await Cart.create({
        customerId: checkUser._id,
        productsList: []
    });


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
    const {usernameOremail, password} = req.body;
    // const username = req.body.username;
    // const 

    if (!usernameOremail){
        throw new ApiError(400, "username or email is required");
    };

    const user = await User.findOne({
        $or: [
            {username: usernameOremail},
            {email: usernameOremail}
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
        secure: true,
        // sameSite: 'None',
        // domain: "http://localhost:3000",
        path: "/"
    };

    // const options = {
    //     httpOnly: true,
    //     secure: false, // Set to true if HTTPS is used in production
    //     sameSite: 'None', // Adjust based on your requirements
    //     path: '/', // Ensure the cookie is accessible site-wide
    //     domain: 'localhost', // Domain of your frontend application
    // };

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
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                // refreshToken: undefined

                refreshToken: null
            }
        },
        {
            new: true
        }
    );

    // creating and configuring cookie
    const options = {
        httpOnly: true,
        secure: true
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged Out"
        )
    );


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