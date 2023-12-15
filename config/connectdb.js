import mongoose from "mongoose";

const connectdb = async (MONGO_URL) => {
  try {
    const DB_OPTIONS = {
      //user: "shakirraza9520",
      //pass: "cx59HUO6A7Day5q9",
      dbName: "okaydb",
    };
    await mongoose.connect(MONGO_URL, DB_OPTIONS);
  } catch (err) {
    console.log(err);
  }
};
export default connectdb;
