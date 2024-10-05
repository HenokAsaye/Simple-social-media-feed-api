import {Router} from "express"
import {likeForComment,likeForPost,likePost,unlikePost,UnlikeComment,LikeComment} from "../controllers/likeController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/",authenticateToken,likePost);
router.post("/",authenticateToken,LikeComment);
router.get("/",authenticateToken,likeForPost)
router.get("/",authenticateToken,likeForComment)
router.delete("/",authenticateToken,unlikePost);
router.delete("/",authenticateToken,UnlikeComment)

export default router;
