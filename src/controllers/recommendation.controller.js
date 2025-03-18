import { Configuration, OpenAIApi } from 'openai';
import jwt from 'jsonwebtoken';
import Movie from '../models/Movie.js'; // Ensure this model exists in your DB

let ongoingPromise = null;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getDashboardRecommendations(req, res) {
  try {
    // Check for user authentication
    let userId = null;
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (e) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }

    // Fetch user's top-rated movies
    const topMovies = await Movie.findAll({
      where: { rating: { $gte: 8 } }, // Adjust threshold if needed
      limit: 5,
      order: [['rating', 'DESC']],
    });

    const topTitles = topMovies.map((m) => m.title).join(', ');

    // AI Prompt
    let prompt = `The user has rated these movies highly: ${topTitles}. 
    Based on their taste, recommend 5 similar movies with a brief reason for each.
    Format the response as a JSON array with keys 'title', 'posterPath' (a full URL for the movie poster), and 'reason'.`;

    // Prevent multiple ongoing AI calls
    if (ongoingPromise) {
      const cachedResult = await ongoingPromise;
      return res.json({ recommendations: cachedResult });
    }

    ongoingPromise = (async () => {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.7,
      });
      return completion.data.choices[0].message.content.trim();
    })();

    const recommendationText = await ongoingPromise;
    ongoingPromise = null;
    
    let recommendations;
    try {
      recommendations = JSON.parse(recommendationText);
    } catch (jsonError) {
      recommendations = recommendationText; // Fallback if parsing fails
    }

    res.json({ recommendations });
  } catch (error) {
    ongoingPromise = null;
    console.error('Error fetching AI dashboard recommendations:', error);
    res.status(500).json({ message: 'Error fetching AI recommendations', error: error.message });
  }
}
