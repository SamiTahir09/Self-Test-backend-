import { User } from "../Models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};


export const getuser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existuser = await User.findOne({ email });
        if (!existuser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = bcrypt.compareSync(password, existuser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(existuser);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existuser._id,
                name: existuser.name,
                email: existuser.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const saveUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
