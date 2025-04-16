require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db.config');

// Start server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Product Catalog Service running on port ${PORT}`);
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//hi

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Start the server
startServer();
