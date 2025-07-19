import express from "express";
import { editprofile, getCurruser, getOtherusers, search } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";


const userRouter=express.Router();

userRouter.get("/current",isAuth,getCurruser)
userRouter.get("/others",isAuth,getOtherusers)
userRouter.put("/profile",isAuth,upload.single("image"),editprofile)
userRouter.get("/search",isAuth,search)

export default userRouter; 