import {Router} from "express";
import {signup,login} from "../controllers/authController.js";
import {validateLogin,} from "../utils/validation.js";

const router = Router();
router.post("/signUp",validateLogin,signup);
router.post("/login",validateLogin,login);
export default router;