import dotenv from "dotenv"
import connectDB from "./db/dbIndex.js";

dotenv.config({
  path: './.env'
})

connectDB()
console.log('exited')









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
