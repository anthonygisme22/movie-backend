import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function getMovieDetails(req, res) {
  try {
    const { tmdbId } = req.params;
    if (!tmdbId) {
      return res.status(400).json({ message: 'TMDb ID is required.' });
    }
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('TMDb movie details error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching movie details from TMDb' });
  }
}

export async function searchMovies(req, res) {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
        language: 'en-US',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('TMDb search error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error searching TMDb movies' });
  }
}
