import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image: String,
  },
  {
    collection: "ImageDetails",
  }
);

const ImageDetails = mongoose.model("ImageDetails", imageSchema);

export default ImageDetails;

//"mongodb+srv://profile:profile@profile.uhzxlbn.mongodb.net/profile?retryWrites=true&w=majority"
