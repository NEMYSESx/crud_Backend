import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String, //these all fields required is set to false so even if we dont pass data in it application dont break. Its just an optional field
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
); //it will give the date when it is posted

const User = mongoose.model("user", userSchema);
export default User;
