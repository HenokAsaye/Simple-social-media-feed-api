import {Router} from "express"
import {commentOnPost,deleteComment,editComment,getComment} from "../controllers/commentController.js"
const router = Router()
router.get("/",getComment)
router.delete("/",deleteComment)
router.post("/",commentOnPost)
router.patch("/",editComment)
export default router;