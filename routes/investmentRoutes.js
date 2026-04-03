// POST /balance/add
// GET  /projects
// GET  /projects/:id
// POST /investments
// GET  /investments/my
import express from 'express';
import { invest , getMyInvestments } from '../controllers/investmentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, invest);
router.get('/my', authMiddleware, getMyInvestments);

export default router;