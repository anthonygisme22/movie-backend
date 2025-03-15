// src/controllers/watchlist.controller.js
import Watchlist from '../models/Watchlist.js';

export async function addToWatchlist(req, res) {
  try {
    const { movieTitle } = req.body;
    const userId = req.userId;

    if (!movieTitle) {
      return res.status(400).json({ message: 'Movie title is required.' });
    }

    await Watchlist.create({ userId, movieTitle });

    res.json({ message: 'Movie added to watchlist.' });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Error adding to watchlist' });
  }
}

export async function getWatchlist(req, res) {
  try {
    const userId = req.userId;
    const watchlist = await Watchlist.findAll({ where: { userId } });

    res.json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
}
