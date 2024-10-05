import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import User from "../models/userModel.js";


export const signup = async(req,res)=>{
    const {username,email,password,bio} = req.body;
    const profilePicture = req.file ? req.file.filename : null;
    console.log(req.body);
    console.log(req.file);
    console.log("signup is called")
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:`user with email${email} already Exist!`});
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            username:username,
            email:email,
            password:hashedPassword,
            profilePicture:profilePicture,
            bio:bio
         });
         const user = await newUser.save();
         const token = generateToken(user);
        res.status(201).json({message:"Welcome!You have created account successfully!",token:token})

    }catch(error){
        res.status(500).json({message:"Please try again there is unkown error on the server!",error:error.stack})
        console.log(password)
        console.log(username)
    }
}
export const login = async(req, res) => {
    const { email, password } = req.body;
    console.log("login is called");

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: `There is no account with ${email} email` });
        }

        // Compare the entered password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password or username, please try again" });
        }

        // Generate JWT token and send the response
        const token = generateToken(user);
        res.status(200).json({ email: user.email, token: token });

    } catch (error) {
        res.status(500).json({ message: "Please try again, there might be an unknown error on the server", error: error.stack });
    }
};
