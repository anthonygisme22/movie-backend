// test-openai.js
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function testOpenAI() {
  try {
    const prompt = "Test prompt: recommend 1 movie.";
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 50,
      temperature: 0.7,
    });
    console.log("Response:", completion.data.choices[0].text.trim());
  } catch (error) {
    console.error("Test OpenAI Error:", error.response?.data || error.message);
  }
}

testOpenAI();
