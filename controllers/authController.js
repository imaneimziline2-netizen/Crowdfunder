import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashePassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashePassword,
            role,
        });

        res.status(201).json({ message: "user created", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        // token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
        );
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
