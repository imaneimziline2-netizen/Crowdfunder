import Project from '../models/Project.js';

export const createProject = async (req, res) => {
    try {
        const { title, description, capitalGoal, maxInvestmentPercent } = req.body;

        const project = await Project.create({
            title,
            description,
            capitalGoal,
            maxInvestmentPercent,
            owner: req.user._id
        });

        res.status(201).json(project);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user._id });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
