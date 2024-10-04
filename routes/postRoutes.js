import {Router} from "express";
import {createPost,editPost,deletePost,searchTag,getFollowingPosts} from "../controllers/postController.js";
const router = Router();

router.post("/AddPost",createPost);
router.patch("/editPost",editPost);
router.delete("/deletePost",deletePost);
router.get("/serachTag",searchTag);
router.get("/getffPost",getFollowingPosts);

export default router;
