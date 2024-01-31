//this is a custom Api-error class:-
class ApiError extends Error{ //this Error is the buit-in error 
    constructor(
        statusCode, // Represents the HTTP status code associated with the error.
        message = 'Something went wrong', // Represents the error message 
        errors = [], //Represents the custom errors that we will write.
        stack = '' // A custom stack trace
    ){
        super(message); //Calls the constructor of the parent class (Error) with the provided message. This sets the error message.
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.errors = errors;
        this.success = false;
        if(stack){
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
// Error.captureStackTrace() to capture the stack trace for the current instance. This is useful for better error tracing.
        }
    }
}

export {ApiError}