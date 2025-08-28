import { ApiError } from "../utils/ApiError.js";

const loadEnvs = () => {
  const requiredEnvs = [
    "MONGO_URI",
    "PORT",

    "ACCESS_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRY",

    "REFRESH_TOKEN_SECRET",
    "REFRESH_TOKEN_EXPIRY",

    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
  ];

  requiredEnvs.forEach((env) => {
    if (!process.env[env]) {
      throw new ApiError(500, `'${env}' env variable is required`);
    }
  });

  return {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  };
};

const envVars = loadEnvs();
export default envVars;
