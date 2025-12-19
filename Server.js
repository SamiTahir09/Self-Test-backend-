import express from 'express';
import userRoutes from './Routes/userRoutes.js';
import { connectDB } from './Utils/Db.js';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
connectDB();

// Frontend URL
const frontendURL = "https://self-test-frontend-aoen.vercel.app";

// CORS Middleware for ALL routes including preflight
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", frontendURL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    // Handle OPTIONS preflight request
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// Parse JSON
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
