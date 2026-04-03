// GET  /projects
// GET  /projects/:id
import express from 'express';
import { invest , getMyInvestments } from '../controllers/investmentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, invest);
router.get('/my', authMiddleware, getMyInvestments);

export default router;