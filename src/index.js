// Declare a variable to hold the server instance
let server;

sequelize
  .sync()
  .then(() => {
    console.log('✅ Database connected and synchronized!');
    console.log(`🌍 ENVIRONMENT: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔌 Database URL: ${process.env.DATABASE_URL ? 'Exists' : 'Not Set'}`);
    console.log(`🚀 Server starting on port ${PORT}...`);
    
    // Start the server and store the instance
    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection error:', error);
  });

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  
  if (server) {
    // Stop accepting new connections
    server.close(() => {
      console.log('HTTP server closed');
      
      // Close the Sequelize connection
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
