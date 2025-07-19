
import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
export const signup=async (req,res)=>{
    try {
        const {username,email,password}=req.body
        const checkUserByusername=await User.findOne({username})
        if(checkUserByusername){
            return res.status(400).json({message:"username already exist"})
        }
        const checkemail=await User.findOne({email})
        if(checkemail){
            return res.status(400).json({message:"email already exist"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be of 6 charecters"})
        }
        // password hashed 
        const hashedPassword=await bcrypt.hash(password,10)
        
        const user=await User.create({
            username,email,password:hashedPassword
        })

        const token=await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            maxage:7*24*60*60*1000,
            sameSite:"None",
            secure:true
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:`signup error ${error}`});
    }
}

export const login= async (req,res)=>{
    try{
     const {email,password}=req.body;
     const user=await User.findOne({email});
     if(!user){
        return res.status(400).json({message:"user does not exist"})
     }
     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch){
        return res.status(400).json({message:"incorrect password"})
     }
     const token=await genToken(user._id);
 
     res.cookie("token",token,{
        httpOnly:true,
        maxage:7*24*60*60*1000,
        sameSite:"None",
        secure:true
     })

     return res.status(200).json(user);

    }
    catch (error) {
        res.status(500).json({message:`login error: ${error}`})
    }
 
}

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: "logout error" });
  }
};

