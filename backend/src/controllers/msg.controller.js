import User from "../models/user.model.js";

import cloudinary from "../lib/cloudinary.js"

import Message from '../models/msg.model.js';
import { getReceiverMessage , io } from "../lib/socket.js";


export const getUsersForSideBar  = async (req,res) => {

    try {
        const loggedInUserID = req.user._id;
        
        const filterUsers = await User.find({_id : {$ne : loggedInUserID}}).select("-password");

        res.status(200).json(filterUsers)

    } catch (error) {
        console.log("Error in getUserSideBar " , error.message);
        res.status(500).json({message :  "Internal server Error "});
        
    }
}


export const getMessages = async (req,res) => {
    try {
        const {id:userChatId} = req.params;

        const myID = req.user._id;
        
        const messages = await Message.find({
            $or:[{senderID:myID ,receiverID : userChatId },
                {senderID : userChatId , receiverID : myID }
            ]
        })
        
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controllers  : ",error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const sendMessages = async (req,res) => {
    try {
        const {text,image} = req.body;
        const {id : receiverID} = req.params;
        const senderID = req.user._id;

        let imageUrl;
        if(image){
            const uploadResource  = await cloudinary.uploader.upload(image);
            imageUrl = uploadResource.secure_url;
        }
        const newMessage = new Message({
            senderID,
            receiverID,
            text,
            image : imageUrl,
        })
        
        
        await newMessage.save();
        //todo : socket.io realtime
        
        const receiverMsg  = getReceiverMessage(receiverID);
        if(receiverMsg){
            io.to(receiverMsg).emit("newMessage" ,newMessage );   
        }

        res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessages controller : ",error.message);
        res.status(500).json({error : "internal server error"});
    }
}