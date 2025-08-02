import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        
        if(!token) return res.status(400).json({message : "Invalid No token Provider"});

        const decode  =  jwt.verify(token,process.env.JWT_SECRET);
        if(!decode) return res.status(400).json({message : "Invalid No token Provider"});
        

        const user = await User.findById(decode.userID).select("-password");
        
        if(!user) return res.status(404).json({message :  "User not found"});
        
        req.user = user;

        next();
    } catch (error) {
        console.log('Error in protection Route in middleware',error.message);
        res.status(500).json({message: "Error in middleware Protection Route"});
    }
}