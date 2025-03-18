import Watchlist from '../models/Watchlist.js';

export async function getWatchlist(req, res) {
  try {
    const userId = req.user.id;
    const entries = await Watchlist.findAll({ where: { userId } });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching watchlist", error: error.message });
  }
}

export async function addToWatchlist(req, res) {
  try {
    const { movieId } = req.body;
    const userId = req.user.id;

    // Check if the movie is already in the watchlist
    const existing = await Watchlist.findOne({ where: { userId, movieId } });
    if (existing) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    const newEntry = await Watchlist.create({ userId, movieId });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: "Error adding movie to watchlist", error: error.message });
  }
}
