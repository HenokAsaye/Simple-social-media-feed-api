import {Router} from "express";
import {createPost,editPost,deletePost,searchTag,getFollowingPosts} from "../controllers/postController.js";
const router = Router();

router.post("/",createPost);
router.patch("/",editPost);
router.delete("/",deletePost);
router.get("/",searchTag);
router.get("/",getFollowingPosts);

export default router;
