import express from 'express';
import userRoutes from './Routes/userRoutes.js';
import { connectDB } from './Utils/Db.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// DB
connectDB();

// Allowed frontend
const FRONTEND_URL = "https://self-test-frontend-aoen.vercel.app";

app.use(express.json());

// ✅ MANUAL CORS (Railway safe)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // IMPORTANT: preflight response
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// Routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
