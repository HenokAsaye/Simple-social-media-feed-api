import upload from "../config/uploadConfig";
import { updateProfile } from "../controllers/userControllers.js";
import {createPost} from "../controllers/postController.js"
import { signup } from "../controllers/authController.js";
export const profilepicture = [
    upload.single(profilepicture),
    signup,
]

export const updateuserProfile = [
    upload.single(profilepicture),
    updateProfile,
]
export const addImage =[
    upload.single(addImage),
    createPost,
]