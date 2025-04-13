const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/error.middleware');
const productRoutes = require('./api/routes/product.routes');
const authRoutes = require('./api/routes/auth.routes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Service is healthy' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;