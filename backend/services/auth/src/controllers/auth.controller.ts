import { Request,Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import redis from "../../../../shared/redis/redis.js"
import { randomUUID } from "node:crypto";

export const login =async(req:Request,res:Response)=>{
    try {
        const {token}=req.body;

        const decode =await getAuth(app).verifyIdToken(token)
       
        let user =await User.findOne({firebaseUid:decode.uid})
        if(!user){
            user=await User.create({
                name:decode.name || "",
                email:decode.email || "",
                firebaseUid:decode.uid
            })
        }
        let sessionId=crypto.randomUUID();

        await redis.set(`session:${sessionId}`,JSON.stringify({
            userId:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }),"EX",7*24*60*60)
     
       res.cookie("session",sessionId,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:1000*60*60*24*7,

       })
       return res.status(201).json({sucess:true,user})
        
    } catch (error) {
        return res.status(500).json({sucess:false,message:"login failed"})

    }
}

export const logout=async(req:Request,res:Response)=>{
    try {
        const sessionId=req.cookies?.session;
        if(sessionId){
            await redis.del(`session:${sessionId}`)
        }
        res.clearCookie("session",{
            httpOnly:true,
            secure:false,
            sameSite:"strict"
        })
        return res.status(200).json({
            success:true,message:"Logout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            sucesss:false,message:"logout failed"
        })
        
    }
}