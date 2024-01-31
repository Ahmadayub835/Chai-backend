import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

//we can write router by this method:-

router.route('/register').post(
//from here we injected middlewares of 'avatar' and 'coverImage'. this would be in json format.
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        } , {
            name : "coverImage",
            maxCount : 1
        } //this is for coverImage
    ]), //now we can send images: before method we can use our made middlewares.
    registerUser
    )

    router.route('/login').post(loginUser)

//secured routes:-
router.route('/logout').post(verifyJWT , logoutUser) //in this we inserted a middeware verifyJWT, so in verifyJWT we used a next method to assure that when the first method is called then call the (second method).


export default router
//by using the default we can cusotmize our name in the next file that we will import this.