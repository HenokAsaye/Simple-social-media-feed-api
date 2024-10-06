import {Router} from "express";
import {createPost,editPost,deletePost,searchTag,getFollowingPosts} from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addImage } from "../middlewares/multerMiddleware.js";
const router = Router();

router.post("/",authenticateToken,addImage,createPost);
router.patch("/",authenticateToken,editPost);
router.delete("/",authenticateToken,deletePost);
router.get("/",authenticateToken,searchTag);
router.get("/getffPost",authenticateToken,getFollowingPosts);

export default router;
