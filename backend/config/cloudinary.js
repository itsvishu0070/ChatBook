// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"
// const uploadOnCloudinary=async (filepath)=>{
//     cloudinary.config({
//         cloud_name:process.env.CLOUD_NAME,
//         api_key:process.env.API_KEY,
//         api_secret:process.env.API_SECRET
//     })

//     try {
//         const uploadResult = await cloudinary.uploader.upload(filepath)
//         fs.unlinkSync(filepath) // local se delete karne ke liye
//         return uploadResult.secure_url
//     } catch (error) {
//         fs.unlinkSync(filepath)
//         console.log(error)
//     }

// }

// export default uploadOnCloudinary


import { v2 as cloudinary } from "cloudinary";
import stream from "stream";
import dotenv from "dotenv";
dotenv.config();

 console.log("API_KEY:", process.env.API_KEY); 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    const cloudStream = cloudinary.uploader.upload_stream(
      { public_id: `uploads/${Date.now()}-${filename}`, resource_type: "auto" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.secure_url);
      }
    );

    bufferStream.pipe(cloudStream);
  });
};

export default uploadOnCloudinary;
