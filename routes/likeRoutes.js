import {Router} from "express"
import {likeForComment,likeForPost,likePost,unlikePost,UnlikeComment,LikeComment} from "../controllers/likeController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/post/:postId",authenticateToken,likePost);
router.post("/:commentId",authenticateToken,LikeComment);
router.get("/post/:postId",authenticateToken,likeForPost)
router.get("/comment/:commentId",authenticateToken,likeForComment)
router.delete("/:postId",authenticateToken,unlikePost);
router.delete("/comment/:commentId",authenticateToken,UnlikeComment)

export default router;
