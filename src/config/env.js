const loadEnvs = () => {
  const requiredEnvs = ["MONGO_URI"];

  requiredEnvs.forEach((env) => {
    if (!process.env[env]) {
      // Throw Api error
    }
  });

  return {
    MONGO_URI: process.env.MONGO_URI,
  };
};

const envVars = loadEnvs();
export default envVars;
