import { Router } from "express";
import { signup, login } from "../controllers/authController.js";
import { profilepicture } from "../middlewares/multerMiddleware.js";

const router = Router();

// Route for signup
router.post("/signUp", profilepicture, signup);

// Route for login
router.post("/login", login);

export default router;
