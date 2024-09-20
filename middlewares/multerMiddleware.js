import upload from "../config/uploadConfig";
import { updateProfile } from "../controllers/userControllers.js";
import { signup } from "../controllers/authController.js";
export const profilepicture = [
    upload.single(profilepicture),
    signup,
]

export const updateuserProfile = [
    upload.single(profilepicture),
    updateProfile,
]