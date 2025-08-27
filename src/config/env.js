import { ApiError } from "../utils/ApiError.js";

const loadEnvs = () => {
  const requiredEnvs = ["MONGO_URI", "PORT"];

  requiredEnvs.forEach((env) => {
    if (!process.env[env]) {
      throw new ApiError(500, `'${env}' env variable is required`);
    }
  });

  return {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
  };
};

const envVars = loadEnvs();
export default envVars;
