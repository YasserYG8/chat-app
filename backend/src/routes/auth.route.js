import express from "express";
import { login, signup, logout, updateProfile , checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const route = express.Router();



route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);
route.put("/updateProfile", protectRoute, updateProfile);

route.get("/checkAuth",protectRoute,checkAuth);

export default route;