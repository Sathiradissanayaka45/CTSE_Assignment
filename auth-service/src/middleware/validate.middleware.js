const { validationResult, body } = require('express-validator');
const { validatePasswordStrength } = require('../utils/password.utils');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  next();
};

// Validate registration input
const validateRegisterInput = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .custom((value) => {
      const validation = validatePasswordStrength(value);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validate login input
const validateLoginInput = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  handleValidationErrors
];

// Validate refresh token input
const validateRefreshTokenInput = [
  body('refreshToken')
    .notEmpty().withMessage('Refresh token is required'),
  
  handleValidationErrors
];

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateRefreshTokenInput
};
