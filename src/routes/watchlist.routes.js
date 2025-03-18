import { Router } from 'express';
import { getWatchlist, addToWatchlist } from '../controllers/watchlist.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/watchlist - Returns the authenticated user's watchlist
router.get('/', verifyToken, getWatchlist);

// POST /api/watchlist - Adds a movie to the authenticated user's watchlist
router.post('/', verifyToken, addToWatchlist);

export default router;
