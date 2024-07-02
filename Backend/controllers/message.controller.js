const Message = require('./../models/messages.model.js');
const User = require('./../models/user.model.js');

const asyncHandler = require('./../utils/asyncHandler.js');
const ApiError = require('./../utils/ApiError.js');
const ApiResponse = require('./../utils/ApiResponse.js');

const postMessage = asyncHandler( async (req, res) => {
    const {message} = req.body;
    if (
        [message].some((field) => field?.trim() === '') 
    ) {
        throw new ApiError(400, "Bad Request, Provide all fields")
    };

    let newMessage = await Message.create({
        userId: req.user._id,
        name: req.user.fullName,
        email: req.user.email,
        message: message.trim()
    });
    let checkMessage = await Message.findById(newMessage._id);
    if ( !checkMessage ) {
        throw new ApiError(500, "Internal Server Error! Something went wrong when sending message");
    };

    res.status(201).json(
        new ApiResponse(201, checkMessage, "Message added Successfully")
    );

});


module.exports = {
    postMessage
};