import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import movieRoutes from './routes/movie.routes.js';
import tmdbRoutes from './routes/tmdb.routes.js';
import authRoutes from './routes/auth.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';
import recommendationRoutes from './routes/recommendation.routes.js';
import watchlistRoutes from './routes/watchlist.routes.js';
import reviewRoutes from './routes/review.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Movie Backend is running!');
});

// Mount routes
app.use('/api/movies', movieRoutes);
app.use('/api/tmdb', tmdbRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/reviews', reviewRoutes);


  const PORT = process.env.PORT || 4000;
  sequelize
  .sync()
  .then(() => {
    console.log('✅ Database connected and synchronized!');
    console.log(`🌍 ENVIRONMENT: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔌 Database URL: ${process.env.DATABASE_URL ? 'Exists' : 'Not Set'}`);
    console.log(`🚀 Server starting on port ${PORT}...`);
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection error:', error);
  });
