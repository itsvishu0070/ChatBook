import uploadOnCloudinary from "../config/cloudinary.js";
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js";
import User from "../models/user.model.js";
export const getCurruser= async (req,res)=>{
    try {
        let userId=req.userId;   //yha pe req me already userId hai kyuki ek middleware chla hai isAuth jo ki next karke req.userId me jo userId isAuth find kiya tha wo daal diya 
        let user=await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
         return res.status(500).json({message:`current user error ${error}`})
        
    }

}

export const editprofile=async (req,res)=>{
    try {
        let {name}=req.body    //req.body se name aayega frontend se
        let image;     // agar image hog
        if(req.file){
            // image=await uploadOnCloudinary(req.file.path)
            image = await uploadOnCloudinary(req.file.buffer);

        }
        let user=await User.findByIdAndUpdate(req.userId,{
            name,
            image
        },{new:true})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message:"profile error"})
    }
}


export const getOtherusers=async (req,res)=>{
    try {
        let users=await User.find({
            _id:{$ne:req.userId} //isAuth ke through req.userId se current user ki id milegi and $ne mtlb hota hai not equal to
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`get other users error ${error}`})
    }
}


export const search = async (req,res)=>{
    try {
        let {query}=req.query
        if(!query){
            return res.status(400).json({message:"quer is required"})
        }
        let users=await User.find({
            $or:[
                {name:{$regex:query,$options:"i"}},
                {username:{$regex:query,$options:"i"}}

            ]
        })

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`search error ${error}`})
    }
}