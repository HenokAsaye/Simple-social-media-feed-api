import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import User from "../models/userModel.js";
import upload from "../config/uploadConfig.js"

export const signup = async(req,res)=>{
    const {username,email,password,bio} = req.body;
    const profilePicture = req.file ? req.filename : null;
    try{
        const existingUser = await User.find((p)=>p.email === email)
        if(existingUser){
            return res.status(409).json({message:`user with email${email} already Exist!`});
        }
        const hashedPassword = bcrypt.hash(password,10)
        const newUser ={
            username:username,
            email:email,
            password:hashedPassword,
            profilePicture:profilePicture,
            bio:bio
         };
         const user = await newUser.save();
         const token = generateToken(user);
        res.status(201).json({message:"Welcome!You have created account successfully!",token:token})

    }catch(error){
        res.status(500).Json({message:"Please try again there is unkown error on the server!",error:error.stack})
    }
}
 export const login = async(req,res)=>{
    const{email,password}= req.body;
    const user = await User.findOne({email:email});

    try{

        if(!user){
            return res.status(400).json({message:`There is no account with  ${email} email`})
        }
        const passwordMAtch = await bcrypt.compare(password,User.password)
        if(!passwordMAtch){
            return res.status(401).json({message:"Invalid password or username,please Try Again"})
        }
        const token = generateToken(user);
        res.status(200).json({email:email,token:token})
    }catch(error){
        res.status(500).json({message:`please try Again There migh be unkown error on the server`,error:error})
    }
};
