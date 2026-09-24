import mongoose from "mongoose";


export const connectdb= async()=>{
  try{
     const connect= await mongoose.connect(process.env.MONGOOSE_DB as string)
     console.log("mongoose db connected")
  }catch(err){
    console.log("connecction failed",err)
  }
}