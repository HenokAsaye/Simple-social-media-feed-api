import {Router} from "express"
import {commentOnPost,deleteComment,editComment,getComment} from "../controllers/commentController.js"
import { authenticateToken } from "../middlewares/authMiddleware.js"
const router = Router()
router.get("/",authenticateToken,getComment)
router.delete("/",authenticateToken,deleteComment)
router.post("/",authenticateToken,commentOnPost)
router.patch("/",authenticateToken,editComment)
export default router;