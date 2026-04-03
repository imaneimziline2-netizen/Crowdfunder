import express from 'express';
import { invest , getMyInvestments } from '../controllers/investmentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware,roleMiddleware("investor"), invest);
router.get('/my', authMiddleware,roleMiddleware("investor"), getMyInvestments);

export default router;