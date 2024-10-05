import express from "express";
import auth from "./routes/auth.js";
import commentRoutes from "./routes/commentRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/auth",auth);
app.use("/comment",commentRoutes);
app.use("/like",likeRoutes);
app.use("/notification",notificationRoutes);
app.use("/post",postRoutes);
app.use("/user",userRoutes);

export default app;


