import projet from "../models/Project.js";
import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const { title, description, capitalGoal, maxInvestmentPercent } =
            req.body;

        const project = await Project.create({
            title,
            description,
            capitalGoal,
            maxInvestmentPercent,
            owner: req.user._id,
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

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params ;
        const { title, description, capitalGoal, maxInvestmentPercent } =
            req.body;

        const project = await projet.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.status === "colsed") {
            return res.status(403).json({ message: "Project is clos" });
        }

        project.title = title;
        project.description = description;
        project.capitalGoal = capitalGoal;
        project.maxInvestmentPercent = maxInvestmentPercent;

        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

