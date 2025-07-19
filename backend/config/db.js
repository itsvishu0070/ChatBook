import mongoose from "mongoose";
// import dotenv, { config } from "dotenv"
// dotenv.config()    
const connectDb= async ()=>{
   
    try{
       await mongoose.connect(process.env.MONGO_DB_URI)
       console.log("DB connected")
    }catch{
       console.log("DB Error")
    }
}  

export default connectDb