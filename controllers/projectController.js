import investment from "../models/Investment.js";
import Projet from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const { title, description, capitalGoal, maxInvestmentPercent } =
            req.body;

        const project = await Projet.create({
            title,
            description,
            capitalGoal,
            maxInvestmentPercent,
            owner: req.user.userId
        });

        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMyProjects = async (req, res) => {
    try {
        const projects = await Projet.find({ owner: req.user._id });

        const projectIds = projects.map(p => p._id);

        const allInvestments = await investment.find({
            project: { $in: projectIds }
        }).populate('investor', 'name email balance');

        const investmentsByProject = {};

        allInvestments.forEach(inv => {
            const projectId = inv.project.toString();
            if (!investmentsByProject[projectId]) {
                investmentsByProject[projectId] = [];
            }
            investmentsByProject[projectId].push(inv);
        });

        const projectsWithInvestors = projects.map(project => {
            const projectId = project._id.toString();
            const investments = investmentsByProject[projectId] || [];

            return {
                title: project.title,
                capitalGoal: project.capitalGoal,
                capitalRaised: project.capitalRaised,
                status: project.status,

                investors: investments.map(inv => {
                    const percentage = (inv.amount / project.capitalGoal) * 100;

                    return {
                        name: inv.investor.name,
                        email: inv.investor.email,
                        amount: inv.amount,
                        percentage: percentage.toFixed(2) + '%'
                    };
                })
            };
        });

        res.json(projectsWithInvestors);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, capitalGoal, maxInvestmentPercent } =
            req.body;

        const project = await Projet.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.status === "colsed") {
            return res.status(403).json({ message: "Project is clos" });
        }
        // if (project.owner.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: "Not authorized" });
        // }

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

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        //  find project
        const project = await Projet.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        //  check owner
        if (!project.owner) {
            return res.status(400).json({ message: "Project owner missing" });
        }

        // if (project.owner.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: "Not authorized" });
        // }

        //  delete
        await Projet.findByIdAndDelete(id);

        res.status(200).json({ message: "Project deleted" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const closeProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Projet.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // if (project.owner.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: "Not authorized" });
        // }

        if (project.status === "closed") {
            return res.status(400).json({ message: "Project already closed" });
        }

        project.status = "closed";
        await project.save();

        res.json({ message: "Project closed manually", project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
