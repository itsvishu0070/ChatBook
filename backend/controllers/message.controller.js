import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import {io} from "../socket/socket.js"; 
export const sendMessage=async (req,res)=>{
     try {
    
        let sender=req.userId;
        let {receiver}=req.params
        let {message}=req.body

        let image;
        if(req.file){
          // image=await uploadOnCloudinary(req.file.path)
          
          image = await uploadOnCloudinary(
            req.file.buffer,
            req.file.originalname
          );
        }

        // pahle check krenge ki kabhi send aur reciver ke bich me conversation hui hai agar hui hai to push krenge messages 
        //nhi to kya krenge conversation create krenge
        let conversation=await Conversation.findOne({
            participant:{$all:[sender,receiver]}
        })

        let newMessage = await Message.create({sender,receiver,message,image})

        if(!conversation){
            conversation=await Conversation.create({
                participant:[sender,receiver],
                messages:[newMessage._id]
            })
        }else{
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }
        const receiverSocketId=getReceiverSocketId(receiver)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        return res.status(201).json(newMessage);
     } catch (error) {
    console.log("SEND MESSAGE ERROR:", error); 
    return res.status(500).json({
      message: `send message error ${error}`})
    }
}

export const getMessages=async (req,res)=>{
    try {
        let sender=req.userId
        let {receiver}=req.params
         let conversation=await Conversation.findOne({
            participant:{$all:[sender,receiver]}
        }).populate("messages")
        if(!conversation){
            return res.status(400).json([])
        }
        res.status(200).json(conversation?.messages)
    } catch (error) {
        return res.status(500).json(
            {message:`get message error ${error}`}
        )
    }
}