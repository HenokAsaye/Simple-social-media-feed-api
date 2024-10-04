import {Router} from "express";
import {updateProfile,followUser,unfollowUser,searchUser,getUserActivity} from "../controllers/userControllers.js";
const router = Router();

router.patch("/",updateProfile);
router.post("/",followUser);
router.delete("/",unfollowUser);
router.get("/",searchUser);
router.get("/",getUserActivity);


export default router;