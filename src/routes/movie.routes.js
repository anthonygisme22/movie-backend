import { Router } from 'express';
import { getAllMovies } from '../controllers/movie.controller.js';

const router = Router();

router.get('/', getAllMovies);

export default router;
