import { Router } from 'express';
import { addReview, getReviewsByMovie, updateReview, deleteReview, getMyReviews } from '../controllers/review.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Get reviews for the logged-in user
router.get('/my', verifyToken, getMyReviews);

// Create a new review (protected)
router.post('/', verifyToken, addReview);

// Get reviews for a specific movie (public)
router.get('/:movieId', getReviewsByMovie);

// Update a review (protected)
router.put('/:reviewId', verifyToken, updateReview);

// Delete a review (protected)
router.delete('/:reviewId', verifyToken, deleteReview);

export default router;
