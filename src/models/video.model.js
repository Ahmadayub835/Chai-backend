import mongoose, { Schema } from "mongoose";
//this is the plugin that we installed and used in schema as a plugin.
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: [true, "Video must be uploaded"],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    Owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String, //title will be given from cloudinary.
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //duration will be given from cloudnary.
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate); 
//we can add our custom installed plugins in the mngoose schema.
export const Video = mongoose.model("Video", videoSchema);
