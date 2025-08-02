import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSideBar, getMessages, sendMessages } from "../controllers/msg.controller.js";
const route = express.Router();



route.get("/users", protectRoute,getUsersForSideBar);
route.get("/:id",protectRoute , getMessages);
route.post("/send/:id",protectRoute,sendMessages);


export default route;