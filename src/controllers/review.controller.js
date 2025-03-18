import Review from '../models/Review.js';

export async function addReview(req, res) {
  try {
    const { movieId, rating, comment } = req.body;
    const userId = req.user.id;
    const newReview = await Review.create({ userId, movieId, rating, comment });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
}

export async function getReviewsByMovie(req, res) {
  try {
    const { movieId } = req.params;
    // This returns an empty array if no reviews exist for the given movieId
    const reviews = await Review.findAll({ where: { movieId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
}

export async function updateReview(req, res) {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const review = await Review.findOne({ where: { id: reviewId, userId } });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    review.rating = rating;
    review.comment = comment;
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error: error.message });
  }
}

export async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const review = await Review.findOne({ where: { id: reviewId, userId } });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await review.destroy();
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
}

export async function getMyReviews(req, res) {
  try {
    const userId = req.user.id;
    const reviews = await Review.findAll({ where: { userId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your reviews", error: error.message });
  }
}
