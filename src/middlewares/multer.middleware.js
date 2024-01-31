import multer from "multer";
//this is as a middleware we made to save files on our local server.

const storage = multer.diskStorage({
//the multer takes file from this path and iplaod it to the cloundinary and 
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //this const is to make the file names unique and chnaged.

//>we recieves the file with from cloudinary with a url.
    cb(null, file.originalname);
    //this is the file.(file name):
  }
});

//so we should have to export this file.
export const upload = multer({
  storage,
  //the storage is the function that is made upper to export the functionality of storage.
});

