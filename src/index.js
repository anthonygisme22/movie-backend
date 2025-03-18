import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios'; // used in controllers
// Import your route files
import movieRoutes from './routes/movie.routes.js';
import tmdbRoutes from './routes/tmdb.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Movie Backend is running!');
});

app.use('/api/movies', movieRoutes);
app.use('/api/tmdb', tmdbRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
