import express from 'express';
import { getuser, saveUser } from '../Controllers/userController.js';

const userRoutes = express.Router();


userRoutes.post('/login', getuser)
userRoutes.post('/save', saveUser);




export default userRoutes;