import { Router } from 'express';
import { getDashboardRecommendations } from '../controllers/recommendation.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Returns AI-powered movie recommendations for the user's dashboard
router.get('/dashboard-ai', verifyToken, getDashboardRecommendations);

export default router;
