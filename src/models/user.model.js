import mongoose, { Schema } from "mongoose";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //the avatar images are made from cloudinary this will made link of string
      required: true,
    },
    coverImage: {
      type: String, //the Cover images are made from cloudinary this will made link of string
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId, //we use reference from video file
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//this is the method to use middlewares in the mongoose. we also used async function in this because it takes some time to encryption.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //we make the logic that : if the 'password' is not (!) modified (isModified) then call the next function directly and do not change the password.
  this.password = await bcrypt.hash(this.password, 10);
  //this bcrypt saves password in the encrypted form.
  next();
});

//we had to use UserSchema and we will describe our methods by using methods of mongoose.
//this.password is encrypted and password is simple password that a user typed.

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//we make this method for access token. it extracts all the methods of userSchema and defines it in the sign as a object.
userSchema.methods.getAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
//this is the token expiry from the .env file.
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//we make this method for refresh token for refreshing. it extracts all the methods of userSchema and defines it in the sign as a object.
userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
//this is the token expiry from the .env file.
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
