import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app=express();
dotenv.config();
const PORT=process.env.PORT||7000;
const MONGOURL=process.env.MNOGO_URL;
mongoose.connect(MONGOURL).then(()=>{
    console.log("db connected");
    app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});
}).catch((err)=>{
    console.log(err);
})

