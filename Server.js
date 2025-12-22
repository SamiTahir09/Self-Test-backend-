// server.js
import express from 'express';
import userRoutes from './Routes/userRoutes.js';
import { connectDB } from './Utils/Db.js';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.use(express.json());


app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://self-test-frontend-aoen.vercel.app'
    ],
    credentials: true
}));


app.use('/api/user', userRoutes);


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
