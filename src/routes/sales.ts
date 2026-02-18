import { Router } from 'express';
import { getDailySales } from '../controllers/sales';

const router = Router();

router.get('/daily', getDailySales);

export default router;
