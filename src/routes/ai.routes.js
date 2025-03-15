import { Router } from 'express';
import { getRecommendations } from '../controllers/ai.controller.js';

const router = Router();

router.post('/recommend', getRecommendations);

export default router;
