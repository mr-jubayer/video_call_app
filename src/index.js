import "dotenv/config";
import { app } from "./app.js";
import envVars from "./config/env.js";
import connectDB from "./db/index.js";

(async () => {
  try {
    await connectDB();

    app.listen(envVars.PORT, () => {
      console.log(`⚙️ Server is running at port : ${envVars.PORT}`);
    });

    app.on("error", (err) => {
      console.log("App error", err);
      throw err;
    });
  } catch (error) {
    console.log("MONGODB connection FAILED!!", error);
  }
})();
