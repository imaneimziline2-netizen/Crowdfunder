import Project from '../models/Project.js';
import Investment from '../models/Investment.js';

export const invest = async (req, res) => {
    try {
        const { projectId, amount } = req.body;

        const project = await Project.findById(projectId);

        //  project closed
        if (project.status === 'closed') {
            return res.status(400).json({ message: 'Project is closed' });
        }

        //  exceed capital
        const capitalLeft = project.capitalGoal - project.capitalRaised;
        if (amount > capitalLeft) {
            return res.status(400).json({ message: 'Amount exceeds capitalLeft capital' });
        }

        //  exceed 50%
        if (amount > project.capitalGoal * 0.5) {
            return res.status(400).json({ message: 'Cannot invest more than 50%' });
        }

        //  create investment
        await Investment.create({
            amount,
            investor: req.user._id,
            project: projectId
        });

        //  update capital
        project.capitalRaised += amount;

        //  AUTO CLOSE
        if (project.capitalRaised >= project.capitalGoal) {
            project.status = 'closed';
        }

        await project.save();

        res.json({ message: 'Investment successful', project });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMyInvestments = async (req, res) => {
    try {
        const investments = await Investment.find({ investor: req.user._id })

        res.json(investments);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};