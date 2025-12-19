import express from 'express';
import userRoutes from './Routes/userRoutes.js';
import { connectDB } from './Utils/Db.js';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// CORS setup for deployed frontend
const frontendURL = "https://self-test-frontend-aoen.vercel.app";

app.use(cors({
    origin: frontendURL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

}));

// Routes
app.use('/api/user', userRoutes);

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
