import mongoose from "mongoose";
import envVars from "../config/env.js";
import { DB_NAME } from "../constant.js";

// DB is always in another continent
const connectDB = async () => {
  try {
    const databaseInstance = await mongoose.connect(
      `${envVars.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      "MONGODB connected, DB HOST:",
      databaseInstance.connection.host
    );
  } catch (error) {
    console.log("DATABASE connection FAILED!!", error);
    process.exit(1);
  }
};

export default connectDB;
