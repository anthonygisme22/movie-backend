import Favorite from '../models/Favorite.js';

export async function addFavorite(req, res) {
  try {
    const { movieId } = req.body;
    const userId = req.user.id; // from auth middleware

    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({ where: { userId, movieId } });
    if (existingFavorite) {
      return res.status(400).json({ message: "Movie already added to favorites" });
    }

    const favorite = await Favorite.create({ userId, movieId });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite", error: error.message });
  }
}

export async function removeFavorite(req, res) {
  try {
    const favoriteId = req.params.id;
    const userId = req.user.id;

    const favorite = await Favorite.findOne({ where: { id: favoriteId, userId } });
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await favorite.destroy();
    res.json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing favorite", error: error.message });
  }
}

export async function getFavorites(req, res) {
  try {
    const userId = req.user.id;
    const favorites = await Favorite.findAll({ where: { userId } });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error: error.message });
  }
}
