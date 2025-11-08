import express from "express"
import cors from "cors"
import {config} from "dotenv"
import { handleContactForm } from "./config/Email.config.js"
config()
const app=express()
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:["POST"],
    allowedHeaders:["Content-type"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post("/sendEmail",handleContactForm)

app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`);
    
})