import User from '../models/User.js';
import projet from '../models/Project.js';
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await projet.find().populate('owner', 'name email');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
