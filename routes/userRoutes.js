import {Router} from "express";
import {updateProfile,followUser,unfollowUser,searchUser,getUserActivity} from "../controllers/userControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { updateuserProfile } from "../middlewares/multerMiddleware.js";
const router = Router();

router.patch("/",updateuserProfile,authenticateToken,updateProfile);
router.post("/",authenticateToken,followUser);
router.delete("/",authenticateToken,unfollowUser);
router.get("/",authenticateToken,searchUser);
router.get("/",authenticateToken,getUserActivity);


export default router;