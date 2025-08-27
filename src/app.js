import cors from "cors";
import express from "express";

const app = express();

const whiteList = [process.env.CORS_ORIGIN, "http://localhost:5173"];

app.use(
  cors({
    origin: whiteList,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes imports
import healthCheckRouter from "./routes/health_check.route.js";

// routes declarations
app.use("/api/v1/health-check", healthCheckRouter);

export { app };
