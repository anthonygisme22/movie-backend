import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Fetch the user's profile from the DB
router.get('/profile', verifyToken, getProfile);

// Update user profile
router.put('/profile', verifyToken, updateProfile);

export default router;
