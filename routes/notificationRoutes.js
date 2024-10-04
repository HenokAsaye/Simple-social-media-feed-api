import {Router} from "express";
import {createNotification,markAsRead,getNotification,clearNotification,unReadNotification} from "../controllers/notificationControllers.js";
const router = Router();

router.post("/Notify",createNotification);
router.get("/checkNotification",getNotification);
router.delete("removeNotification",clearNotification);
router.get("/uncheckedNotificaton",unReadNotification);
router.patch("/checkedNotification",markAsRead);
export default router;
