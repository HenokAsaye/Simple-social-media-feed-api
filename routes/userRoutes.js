import {Router} from "express";
import {updateProfile,followUser,unfollowUser,searchUser,getUserActivity} from "../controllers/userControllers.js";
const router = Router();

router.patch("/update",updateProfile);
router.post("/follow",followUser);
router.delete("/unfollow",unfollowUser);
router.get("/find",searchUser);
router.get("/user",getUserActivity);


export default router;