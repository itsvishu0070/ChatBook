import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket/socket.js";
const port=process.env.PORT;


//const frontendurl = process.env.FRONTEND_URI;
app.use(cors({
    // origin:"https://chat-on-adgw.onrender.com",
    origin:"https://chatbook-frontend.onrender.com",
    credentials:true
})) 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser());




app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)

server.listen(port,()=>{
    connectDb()
    console.log("server started")
})
