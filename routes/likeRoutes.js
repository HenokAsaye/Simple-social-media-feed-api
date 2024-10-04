import {Router} from "express"
import {likeForComment,likeForPost,likePost,unlikePost,UnlikeComment,LikeComment} from "../controllers/likeController.js";
const router = Router();

router.post("/likePost",likePost);
router.post("/likeComment",LikeComment);
router.get("/allUsers",likeForPost)
router.get("/allLikers",likeForComment)
router.delete("/unLikePost",unlikePost);
router.delete("/unLikeComment",UnlikeComment)

export default router;
