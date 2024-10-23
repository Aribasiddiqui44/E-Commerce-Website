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

const registerUser = async (userData) => {
    const { fullName, email, password, username } = userData;

    // Create the new user
    const newUser = await User.create({
        fullName,
        email,
        password,
        username,
    });

    // Create wishlist and cart for the user
    const wishlist = await Wishlist.create({ userId: newUser._id, products: [] });
    const cart = await Cart.create({ customerId: newUser._id, productsList: [] });

    return newUser;
};

const postRegisterUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, username } = req.body;

    // Basic input validation
    if (!fullName || !email || !password || !username) {
        throw new ApiError(400, "All fields are required.");
    }

    // Checking if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists.");
    }

    // Register the user
    const newUser = await registerUser({ fullName, email, password, username });

    if (!newUser) {
        throw new ApiError(500, "Internal Server Error. Failed to create the user.");
    }

    const userResponse = await User.findById(newUser._id).select("-password -refreshToken");

    return res.status(201).json(
        new ApiResponse(200, userResponse, "User registered successfully.")
    );
});

const validateLoginRequest = (usernameOremail, password) => {
    if (!usernameOremail || !password) {
        throw new ApiError(400, "Username/email and password are required.");
    }
};

const findUserByUsernameOrEmail = async (usernameOremail) => {
    const user = await User.findOne({
        $or: [
            { username: usernameOremail },
            { email: usernameOremail }
        ]
    });
    if (!user) {
        throw new ApiError(404, "User does not exist.");
    }
    return user;
};

const validateUserPassword = async (user, password) => {
    const isPasswordValid = await user.passwordValidator(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials.");
    }
};

const generateTokens = async (userId) => {
    return await generateAccessAndRefreshTokens(userId);
};

const fetchUserForResponse = async (userId) => {
    return await User.findById(userId).select("-password -refreshToken");
};

const getCookieOptions = () => {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/"
    };
};

const setLoginCookies = (res, accessToken, refreshToken, options) => {
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
};

const sendSuccessResponse = (res, user, accessToken, refreshToken) => {
    return res.status(200).json(
        new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully")
    );
};

const postLoginUser = asyncHandler(async (req, res) => {
    const { usernameOremail, password } = req.body;

    // Validate request body
    validateLoginRequest(usernameOremail, password);

    // Find the user by email or username
    const user = await findUserByUsernameOrEmail(usernameOremail);

    // Validate password
    await validateUserPassword(user, password);

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateTokens(user._id);

    // Get user details without password and refreshToken
    const loggedInUser = await fetchUserForResponse(user._id);

    // Set cookie options
    const cookieOptions = getCookieOptions();

    // Set cookies and send response
    setLoginCookies(res, accessToken, refreshToken, cookieOptions);
    return sendSuccessResponse(res, loggedInUser, accessToken, refreshToken);
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