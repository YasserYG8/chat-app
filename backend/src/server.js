import express, { json } from "express";
import authRoute from "./routes/auth.route.js";
import msgRoute from "./routes/msg.route.js";
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

//Middleware
app.use(express.json({limit : "10mb"}));
app.use(express.urlencoded({extended : true , limit : "10mb"}));
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
})
)


app.use("/api/auth",authRoute);
app.use("/api/message",msgRoute);


connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server is running on PORT "+PORT);

    })
})
