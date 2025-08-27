import "dotenv/config";
import express from "express";
import envVars from "./config/env.js";
import connectDB from "./db/index.js";

const app = express();

(async () => {
  try {
    await connectDB();

    app.listen(envVars.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT || 8000}`);
    });

    app.on("error", (err) => {
      console.log("App error", err);
      throw err;
    });
  } catch (error) {
    console.log("MONGODB connection FAILED!!", error);
  }
})();
