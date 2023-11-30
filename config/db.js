import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDb Connected Successfully`);
  } catch (err) {
    console.log(err.error);
    process.exit(1);
  }
};

export default connectDb;
