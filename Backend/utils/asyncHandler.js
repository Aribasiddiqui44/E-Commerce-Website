// async Handler in a promise way.
// const asyncHandler = (requestHandler) => {
//     (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next))
//         .catch((err) => next(err))
//     }
// };

// module.exports = asyncHandler;

// corrected implementation of this , return should be added.
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

module.exports = asyncHandler;

// try-catch way to make a asyncHandler.

// creating a higher order function , taking function as input.
// In JavaScript, higher-order functions are functions that can take other functions as arguments or return functions as their results.
// const asyncHandler = () => {}
// const asyncHandler = (function) => {() => {}}
// const asyncHandler = (function) => () => {}
// const asyncHandler = (function) => async () => {}

// fn representing  function
/*
const asyncHandler = (fn) => async (req, res, next) => {
    try{
        await fn(req, res, next)
    } catch(error){
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}
*/