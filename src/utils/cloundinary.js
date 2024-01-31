import { v2 as cloudinary } from "cloudinary";
//the cloudinary is the service that is used to store the data in server.
import fs from "fs";
//fs is file store imported from the Node.js file system module.

//All the values in this cloudinary config are stored in .env file. which we accessed.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//uploadOnCloudinary is an asynchronous function that takes a localFilePath as a parameter. This function is responsible for uploading a file to Cloudinary.
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return console.log("file is not uploaded");
    const response = await cloudinary.uploader.upload
    (localFilePath, 
      { resource_type: "auto"
    });

    //at this step the file is uploaded.
    // console.log("file is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath); //this is the method of fsunlink (delete method).
//we created here to remove the file after the uploading of file on cloudinary.
console.table(response)
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath); //this is the method of fsunlink (delete method).
    //remove the locally saved temporary files as the upload operation gets failed.
    return null;
  }
};

export { uploadOnCloudinary };
