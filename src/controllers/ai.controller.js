// src/controllers/ai.controller.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiApi = new OpenAIApi(configuration);

export async function getRecommendations(req, res) {
  try {
    const userQuery = req.body.query;
    if (!userQuery) {
      return res.status(400).json({ message: 'Query is required.' });
    }
    
    // Update the system prompt to instruct the model to return JSON
    const response = await openaiApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful movie recommendation assistant. Based on a movie database, provide a list of movies that fit the description given by the user. Return the output as a JSON array where each element is an object with the keys "title", "poster_path" (optional), and "reason". For example: [{"title": "Movie Title", "poster_path": "https://example.com/poster.jpg", "reason": "Because..."}].'
        },
        {
          role: 'user',
          content: userQuery,
        }
      ],
      max_tokens: 200,
    });
    
    const output = response.data.choices[0].message.content.trim();
    let recommendations;
    try {
      recommendations = JSON.parse(output);
    } catch (e) {
      // If parsing fails, fall back to raw output
      console.error('Error parsing AI response as JSON:', e);
      recommendations = output;
    }
    res.json({ recommendations });
  } catch (error) {
    console.error('AI Recommendation error:', error);
    res.status(500).json({ 
      message: 'Error fetching recommendations', 
      error: error.response?.data || error.message 
    });
  }
}
