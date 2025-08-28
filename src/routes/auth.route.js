import { Router } from "express";
import { googleLogin } from "../controllers/auth/google_login.js";

const router = Router();

router.route("/google").post(googleLogin);

export default router;
