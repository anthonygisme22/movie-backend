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
    
    const response = await openaiApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
You are a helpful movie recommendation assistant.
Output must be valid JSON ONLY.
Do not include any additional text or markdown code fences.
Return a JSON array where each element is an object with the following keys:
- "title": string
- "poster_path": string (this can be empty if no poster is available)
- "reason": string
Example:
[
  {
    "title": "Inception",
    "poster_path": "https://image.tmdb.org/t/p/w500/abc123.jpg",
    "reason": "It features a mind-bending plot."
  }
]
`
        },
        {
          role: 'user',
          content: userQuery,
        }
      ],
      max_tokens: 200,
    });
    
    // Clean up output: remove code fences if they exist
    let output = response.data.choices[0].message.content.trim();
    output = output.replace(/```json/g, '').replace(/```/g, '');
    
    let recommendations;
    try {
      recommendations = JSON.parse(output);
    } catch (e) {
      console.error('Error parsing AI response as JSON:', e);
      // Fallback to the raw output if parsing fails.
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
