import dotenv from "dotenv";
import { cert, initializeApp } from "firebase-admin";
dotenv.config()
export const app= initializeApp({
    credential:cert({
        projectId:process.env.FIREBASE_PROJECT_ID,
        clientEmail:process.env.CLIENT_EMAIL,
        privateKey:process.env.Firebase_private_key?.replace(/\\n/g,"/n")
    })
})