import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';

// Import your route files
import movieRoutes from './routes/movie.routes.js';
import tmdbRoutes from './routes/tmdb.routes.js';
import authRoutes from './routes/auth.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';
import recommendationRoutes from './routes/recommendation.routes.js';
import aiRoutes from './routes/ai.routes.js'; // new import for AI recommendations
import watchlistRoutes from './routes/watchlist.routes.js';
import reviewRoutes from './routes/review.routes.js';

dotenv.config();

// 1. Log startup environment info
console.log('=== Starting app ===');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('PORT:', process.env.PORT || 'not set');

const app = express();

// 2. Basic middleware setup
app.use(cors());
app.use(express.json());

// 3. Debug middleware: logs every incoming request
app.use((req, res, next) => {
  console.log(`Incoming request: [${req.method}] ${req.url}`);
  next();
});

// 4. Simple /ping route for debugging
app.get('/ping', (req, res) => {
  console.log('Reached /ping route');
  res.send('pong');
});

// 5. Root endpoint to verify the server is running
app.get('/', (req, res) => {
  console.log('Reached root endpoint /');
  res.send('Movie Backend is running!');
});

// 6. Mount your API routes
app.use('/api/movies', movieRoutes);
app.use('/api/tmdb', tmdbRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/recommendations/ai', aiRoutes); // AI recommendations route
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/reviews', reviewRoutes);

// 7. Port setup
const PORT = process.env.PORT || 4000;
let server; // will hold the server instance

// 8. Start the server inside an async function to catch DB errors
(async function startServer() {
  console.log('Attempting to sync database...');
  try {
    await sequelize.sync();
    console.log('✅ Database connected and synchronized!');
    console.log(`🌍 ENVIRONMENT: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔌 Database URL: ${process.env.DATABASE_URL ? 'Exists' : 'Not Set'}`);
    console.log(`🚀 Server starting on port ${PORT}...`);

    // 9. Listen on PORT, binding to 0.0.0.0 for Railway
    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
})();

// 10. Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');

  if (server) {
    // Stop accepting new requests
    server.close(() => {
      console.log('HTTP server closed');

      // Close the DB connection
      sequelize.close()
        .then(() => {
          console.log('Database connection closed');
          process.exit(0);
        })
        .catch((error) => {
          console.error('Error during database shutdown:', error);
          process.exit(1);
        });
    });
  } else {
    process.exit(0);
  }
});
