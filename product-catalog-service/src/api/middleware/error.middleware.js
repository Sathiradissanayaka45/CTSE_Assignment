const logger = require('../../utils/logger');

exports.errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`${err.name}: ${err.message}`);
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate field value entered'
    });
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      error: messages
    });
  }
  
  // Mongoose cast error (invalid ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Resource not found'
    });
  }
  
  // Default server error
  res.status(err.statusCode || 500).json({
    error: err.message || 'Server Error'
  });
};