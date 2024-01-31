//This pattern is commonly used in Express.js to wrap asynchronous route handlers or middleware functions. It simplifies error handling for asynchronous operations
const asyncHandler = (requestHandler) => { // this is high order function which is returning paramter and taking function as a parameter.
    return (req , res, next) => {
//this promise checks if the promise is resolve then it calls requestHandler function with his parameters.
        Promise.resolve(requestHandler(req , res , next))
//if the error occurs it dispatches the error after the next paramter because it is the last parameter.
        .catch((err) => next(err))
    }
}


export {asyncHandler}








/* this is the try catch function:-
//this is an high order function in which we passes function as an argument and then make the function so we make the async function and passed the parameter
const asyncHandler =(fn) => async (req , res , next) => { 
    try {
        await fn(req , res, next)
    } catch (error) {
//this res.status is the middleware method which is used to get the error. 
        res.status(error.code || 500).json({
//here we used json to show the error in the form of json, the success tells the it is not completed and message shows the error message.
            success : false,
            message : error.message
        })
    }
} */

