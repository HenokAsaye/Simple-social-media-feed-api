import {Router} from "express";
import {createNotification,markAsRead,getNotification,clearNotification,unReadNotification} from "../controllers/notificationControllers.js";
const router = Router();

router.post("/",createNotification);
router.get("/",getNotification);
router.delete("",clearNotification);
router.get("/",unReadNotification);
router.patch("/",markAsRead);
export default router;
