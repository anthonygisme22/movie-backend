import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function getMovieDetails(req, res) {
  try {
    const { tmdbId } = req.params;
    if (!tmdbId) return res.status(400).json({ message: 'TMDb ID is required.' });
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
    if (!query) return res.status(400).json({ message: 'Query is required' });
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

export async function getTrendingMovies(req, res) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error('TMDb trending error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching trending movies from TMDb' });
  }
}

export async function getSimilarMovies(req, res) {
  try {
    const { tmdbId } = req.params;
    if (!tmdbId) return res.status(400).json({ message: 'TMDb ID is required.' });
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}/similar`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('TMDb similar movies error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching similar movies from TMDb' });
  }
}

export async function getMovieVideos(req, res) {
  try {
    const { tmdbId } = req.params;
    if (!tmdbId) return res.status(400).json({ message: 'TMDb ID is required.' });
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}/videos`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('TMDb videos error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching movie videos from TMDb' });
  }
}

export async function getMovieCredits(req, res) {
  try {
    const { tmdbId } = req.params;
    if (!tmdbId) return res.status(400).json({ message: 'TMDb ID is required.' });
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}/credits`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('TMDb credits error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching movie credits from TMDb' });
  }
}

// NEW: Advanced Search Endpoint
export async function advancedSearchMovies(req, res) {
  try {
    const { query, year, with_genres } = req.query;
    const params = {
      api_key: process.env.TMDB_API_KEY,
      language: 'en-US',
      sort_by: 'popularity.desc',
    };
    if (year) {
      params.primary_release_year = year;
    }
    if (with_genres) {
      params.with_genres = with_genres;
    }
    if (query && query.trim() !== '') {
      // If a query is provided, use the search endpoint
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query,
          language: 'en-US',
        },
      });
      return res.json(response.data);
    } else {
      // If no query, use the discover endpoint with filters
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, { params });
      return res.json(response.data);
    }
  } catch (error) {
    console.error('Advanced search error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error performing advanced search', error: error.message });
  }
}
