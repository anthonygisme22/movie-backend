import Movie from '../models/Movie.js';

export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies from database:', error);
    res.status(500).json({ message: 'Error fetching movies from database', error: error.message });
  }
}
