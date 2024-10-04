import {Router} from "express"
import {likeForComment,likeForPost,likePost,unlikePost,UnlikeComment,LikeComment} from "../controllers/likeController.js";
const router = Router();

router.post("/",likePost);
router.post("/",LikeComment);
router.get("/",likeForPost)
router.get("/",likeForComment)
router.delete("/",unlikePost);
router.delete("/",UnlikeComment)

export default router;
