// src/routes/watchlist.routes.js
import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { addToWatchlist, getWatchlist } from '../controllers/watchlist.controller.js';

const router = Router();

router.post('/add', authMiddleware, addToWatchlist);
router.get('/', authMiddleware, getWatchlist);

export default router;
