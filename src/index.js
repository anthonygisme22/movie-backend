// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import movieRoutes from './routes/movie.routes.js';
import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js';
import watchlistRoutes from './routes/watchlist.routes.js';



dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Movie Backend is running!');
});

// API routes
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/watchlist', watchlistRoutes);
const PORT = process.env.PORT || 4000;
sequelize.sync()
  .then(() => {
    console.log('Database connected and synchronized!');
    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
