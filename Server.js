import express from 'express';
import { connectDB } from './Utils/Db.js';
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from './Routes/userRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());


app.use(cors({
    origin: 'https://self-test-frontend-aoen.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api/user', userRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
