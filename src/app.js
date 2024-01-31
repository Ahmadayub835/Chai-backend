import express, { urlencoded } from 'express'
import cors from 'cors' //enables cors to customize data from another server of backend.
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({ origin : process.env.CORS_ORIGIN , 
    credentials : true }))

app.use(express.json({limit : '16kb'})) //this limit is the size of json data
//because the data from the backend is in the different forms, this method allows the server to accept data in json format. It is used to handle and parse JSON data sent in the request body. 

app.use(urlencoded({extended : true , limit : '16kb'})) 
//this methods converts the data in simple format, that is encoded. 

app.use(express.static("public"))
//when we want to store the files that we get like pdf,photos,videos etc. we use static method.
//these files will be stored by us to show them on our website or app.

app.use(cookieParser())
//this is used to access us the cookies of the user'browser from the help of server and we can set our cookies to user's browser



                            //we import routes here:-
import userRouter from './routes/user.routes.js'


//we are writing app.write before because we are using routes and controllers in a same file so we use this method.
//but now we have routes and controllers are in different file so we use middleware (app.use).
                            //Routes usage/declaration:-
app.use('/api/v1/users' , userRouter)
//we have to define our api and api version.
//which we give there i will made prefix (pre-set/initial) like https://localhost:8000/api/v1/users/register/login
// after writing this if we had to add a login page we dont't write it here we will write it in the routes file.

export {app}


