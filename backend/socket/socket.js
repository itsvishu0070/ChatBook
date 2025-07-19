import http from "http"
import express from "express"
import { Server } from "socket.io"

let app=express()
const server=http.createServer(app);
//const frontendurl = process.env.FRONTEND_URI;
const io=new Server(server,{
    cors:{
        // origin:"https://chat-on-adgw.onrender.com",
        origin:"https://chatbook-frontend.onrender.com",
        credentials:true
    }
})
export const userSocketMap ={}
export const getReceiverSocketId=(receiver)=>{
    return userSocketMap[receiver]
}
io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId
    if(userId!=undefined){
        // console.log(userId , socket.id)
        userSocketMap[userId]=socket.id
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
   socket.on("disconnect",()=>{
    delete userSocketMap[userId]
     io.emit("getOnlineUsers",Object.keys(userSocketMap))
   })

})


export {app,server,io}
