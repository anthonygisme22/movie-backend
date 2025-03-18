import { Router } from 'express';
import { getMovieDetails, searchMovies } from '../controllers/tmdb.controller.js';

const router = Router();

router.get('/movie/:tmdbId', getMovieDetails);
router.get('/search', searchMovies);

export default router;
