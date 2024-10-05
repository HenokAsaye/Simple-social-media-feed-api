import {Router} from "express";
import {createNotification,markAsRead,getNotification,clearNotification,unReadNotification} from "../controllers/notificationControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/",authenticateToken,createNotification);
router.get("/",authenticateToken,getNotification);
router.delete("",authenticateToken,clearNotification);
router.get("/",authenticateToken,unReadNotification);
router.patch("/",authenticateToken,markAsRead);
export default router;
