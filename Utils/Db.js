import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sami:12345@samibackend.8tsol.mongodb.net/SelfTest');
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}   
