import {Router} from "express"
import {commentOnPost,deleteComment,editComment,getComment} from "../controllers/commentController.js"
import { authenticateToken } from "../middlewares/authMiddleware.js"
const router = Router()
router.get("/:postId",authenticateToken,getComment)
router.delete("/:postId",authenticateToken,deleteComment)
router.post("/:postId",authenticateToken,commentOnPost)
router.patch("/:postId",authenticateToken,editComment)
export default router;