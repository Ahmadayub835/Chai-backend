import mongoose from "mongoose";
//this import is for the database that we make on our local system. 
import { DB_NAME } from "../constants.js";
//This is the main database file where the database is connected from node atlas.

//this is an async function that will connect us to the backend server.
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !!! DB:HOST 
        ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('MongoDb connection Failed' , error)
        process.exit(1)
    }
}

export default connectDB