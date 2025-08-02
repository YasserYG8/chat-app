import mongoose from "mongoose";

export const connectDB  = async () => {
    try {
        const cnx = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Data is connected successfully  : ${cnx.connection.host}`);
    } catch (error) {
        console.log("Data is not connected  : ",error);

    }
}