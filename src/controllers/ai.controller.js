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
    
    // Use Chat Completion API instead of the deprecated text-davinci-003 model
    const response = await openaiApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful movie recommendation assistant. Based on a movie database, provide a list of movies that fit the description given by the user along with a brief reason for each recommendation.'
        },
        {
          role: 'user',
          content: userQuery,
        }
      ],
      max_tokens: 200,
    });
    
    const recommendations = response.data.choices[0].message.content.trim();
    res.json({ recommendations });
  } catch (error) {
    console.error('AI Recommendation error:', error);
    res.status(500).json({ 
      message: 'Error fetching recommendations', 
      error: error.response?.data || error.message 
    });
  }
}
