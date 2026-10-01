import Redis from "ioredis"
import { connect } from "node:http2"

const redis = new Redis(
    process.env.REDIS_URL || "redis://localhost:6379",{
        maxRetrivePerRequest:null
    }
)
redis.on("connect",()=>{
    console.log("Redis Connected")
})
redis.on("error",(error)=>{
    console.log('redis error',error)
})
export default redis
