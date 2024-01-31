import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

//This code is a middleware named verifyJWT that checks whether a user is logged in by verifying the authenticity of an access token
export const verifyJWT = asyncHandler(async (req , res , next) =>{
try {
        const token = req.cookies?.accessToken ||  
//this checks if the 'Authorization' is in header request then it replaces it with the bearer.
         req.header("Authorization")?.replace("Bearer " , "")
    
        if (!token) {
            console.error(error);
            throw new ApiError(401, 'Unauthorizes request')
        }
    
//This line of code is using the jwt.verify method to decode and verify the authenticity of the access token.
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) //basically it decodes the information of the user when the user was added and the token was created and then it verifies that the token is not tempred with the api party.like mogodb.
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken") //The result, stored in the user variable, is a user object without sensitive information like the password and refresh token. 
        
        if (!user) {
            throw new ApiError(401, 'Invalid Access Token')
        }
    
        req.user = user; // Represents the incoming HTTP request object.
//A function that, when called, passes control to the next middleware in the stack.        
next() //The user object obtained from the database after decoding and verifying the access token.
       
} catch (error) {
    throw new ApiError(401 , error?.message || 'Invalid acess Token')
}
})
