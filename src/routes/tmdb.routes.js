import { Router } from 'express';
import { 
  getMovieDetails, 
  searchMovies, 
  getTrendingMovies, 
  getSimilarMovies, 
  getMovieVideos, 
  getMovieCredits,
  advancedSearchMovies
} from '../controllers/tmdb.controller.js';

const router = Router();

router.get('/movie/:tmdbId', getMovieDetails);
router.get('/movie/:tmdbId/credits', getMovieCredits);
router.get('/movie/:tmdbId/videos', getMovieVideos);
router.get('/movie/:tmdbId/similar', getSimilarMovies);
router.get('/search', searchMovies);
router.get('/trending', getTrendingMovies);
router.get('/discover', advancedSearchMovies);

export default router;
