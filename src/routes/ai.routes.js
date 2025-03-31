import { Router } from 'express';
import { getRecommendations } from '../controllers/ai.controller.js';

const router = Router();

// Handle POST requests to /api/recommendations/ai
router.post('/', getRecommendations);

export default router;
