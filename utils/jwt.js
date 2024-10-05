import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const generateToken = (user)=>{
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return token
}