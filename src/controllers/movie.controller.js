const localMovies = [
  {
    id: 1,
    title: 'The Invisible Man',
    year: 2020,
    rating: 72.5,
    bakedscale: 'Baked',
    tmdbId: 570670,
  },
  {
    id: 2,
    title: 'Sleepless',
    year: 2017,
    rating: 60,
    bakedscale: 'Sober',
    tmdbId: 335777,
  },
  {
    id: 3,
    title: 'Priest',
    year: 2011,
    rating: 43.5,
    bakedscale: 'Sober',
    tmdbId: 49020,
  },
  // Add more as needed
];

export async function getAllMovies(req, res) {
  try {
    res.json(localMovies);
  } catch (error) {
    console.error('Error fetching local movies:', error);
    res.status(500).json({ message: 'Error fetching local movies' });
  }
}
