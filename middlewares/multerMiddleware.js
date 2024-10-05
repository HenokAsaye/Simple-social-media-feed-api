import upload from "../config/uploadConfig.js";
import { updateProfile } from "../controllers/userControllers.js";
import {createPost} from "../controllers/postController.js"
import { signup } from "../controllers/authController.js";
export const profilepicture = [
    upload.single('profilePicture'),
    signup,
]

export const updateuserProfile = [
    upload.single('profilePicture'),
    updateProfile,
]
export const addImage =[
    upload.single('addImage'),
    createPost,
]