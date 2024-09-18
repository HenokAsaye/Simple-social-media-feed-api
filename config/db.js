import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDb = async () =>{
    try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("connected to mongoDb")
    }catch(error){
        console.log("Failed to connect to db",error)
        process.exit(1)
    }

};

export default connectToDb;

