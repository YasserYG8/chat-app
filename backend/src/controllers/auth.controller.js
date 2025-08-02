import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if (!email || !fullName || !password) return res.status(400).json({ message: "all fields are required" });

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be  > 6 caracters" });
        }
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exist" });
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            email: email,
            fullName: fullName,
            password: hashPassword
        })

        if (!newUser) {
            return res.status(400).json({ message: "invalid user data" });
        }
        else {
            // generate JWT here 
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: fullName,
                email: email,
                profilePic: newUser.profilPic


            })

        }

    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "Internal server Error" });

    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(402).json({ message: 'Password is wrong' });

        }
        generateToken(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: email,
            profilePic: user.profilePic
        })


    } catch (error) {
        console.log('Error in login controller ', error.message);
        res.status(500).json({ message: "Internal server Error" });


    }

}

export const logout = async (req, res) => {
    ; try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (e) {
        console.log("Error in logout controller ", e.message);
        res.status(500).json({ message: "Internal Server error" });
    }

}
export const updateProfile = async (req, res) => {
    try {
        const { profilPic } = req.body;
        
        const userId = req.user._id;

        if (!profilPic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilPic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilPic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log('Error in checkAuth controller', error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}