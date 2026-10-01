import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connect } from "node:http2"
import { connectdb } from "./config/db.js"
import authRouter from "./routes/auth.routes.js"

dotenv.config()

const app=express()

app.use(express.json())
app.use(cookieParser())


const PORT=process.env.PORT || 8001


app.get('/',(req,res)=>{
   res.json('hello from digital----book --- store ---services')
})
app.use("/",authRouter)

app.listen(PORT,()=>{
    console.log(`auth Server running on http://localhost:${PORT}`)
    connectdb()
})