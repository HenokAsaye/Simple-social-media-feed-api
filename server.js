import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/db.js"

dotenv.config();
const app = express();

connectToDb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server is listening")
    })

}).catch(error=>console.log("Error while connection",error));




