import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favorite.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getFavorites);
router.post('/', verifyToken, addFavorite);
router.delete('/:id', verifyToken, removeFavorite);

export default router;
