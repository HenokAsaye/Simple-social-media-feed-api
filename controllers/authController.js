import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import User from "../models/userModel.js";

export const signup = async(req,res)=>{
    const {username,email,password} = req.body;
    try{
        const existingUser = await User.find((p)=>p.email === email)
        if(existingUser){
            return res.status(409).json({message:`user with email${email} already Exist!`});
        }
        const hashedPassword = bcrypt.hash(password,10)
        const newUser ={
            username:username,
            email:email,
            password:hashedPassword
        }
        res.status(201).send("Account Created Successfully!")

    }catch(error){
        res.status(500).Json({message:"server Error"})
    }
}

