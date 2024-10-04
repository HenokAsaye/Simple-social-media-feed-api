import {Router} from "express"
import {commentOnPost,deleteComment,editComment,getComment} from "../controllers/commentController.js"
const router = Router()
router.get("/comment",getComment)
router.delete("/deleteComment",deleteComment)
router.post("/comment",commentOnPost)
router.patch("/editComment",editComment)
export default router;