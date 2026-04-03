
import express from 'express';
import { getAllUsers, getAllProjects } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();


router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);

router.get('/projects', authMiddleware, roleMiddleware('admin'), getAllProjects);

export default router;