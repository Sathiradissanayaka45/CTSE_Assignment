const app = require('./app');
const { connectDB } = require('./config/db.config');
const logger = require('./utils/logger');
const { PORT } = require('./config/server.config');

// Connect to database
connectDB();

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = server;