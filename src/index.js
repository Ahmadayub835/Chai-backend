import dotenv from "dotenv";
import connectDB from "./db/dbIndex.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
//because we used async function in our connectDB so it returns a promise and we have
//handle it in a .then and catch for the handling of errors and execution so we simply used then if it is connected to the server and catch for the errors
  
  //this is for the connecting of server to database:-
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})




/*import express from "express";
const app = express();
//This part sets up a global error handler for the Express app:-
app.on((error) => {
  console.log("Error", error);
  throw error;
});

app.listen(process.env.PORT, () => {
  console.log(`Our app is listening on ${process.env.PORT}`)});


//This is an immediately invoked function expression (IIFE) that connects to the MongoDB database using Mongoose.
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
})(); */
