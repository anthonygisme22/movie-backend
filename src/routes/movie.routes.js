import { Router } from 'express';
import { getAllMovies, getMovieById } from '../controllers/movie.controller.js';

const router = Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);

export default router;
