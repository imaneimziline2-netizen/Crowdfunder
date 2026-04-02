// POST /balance/add
// GET  /projects
// GET  /projects/:id
// POST /investments
// GET  /investments/my
import express from 'express';
import { invest } from '../controllers/investmentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/investments
// 1️⃣ فقط investors مسموح لهم
// 2️⃣ middleware auth ضروري
router.post('/', authMiddleware, invest);

export default router;