import Movie from '../models/Movie.js';

export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error fetching movies' });
  }
}

export async function getMovieById(req, res) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie by id:', error);
    res.status(500).json({ message: 'Server error fetching movie' });
  }
}
