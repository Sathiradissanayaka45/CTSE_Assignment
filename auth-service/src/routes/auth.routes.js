const express = require('express');
const { 
  register, 
  login, 
  verifyEmail,
  refreshToken, 
  logout,
  forgotPassword,
  resetPassword 
} = require('../controllers/auth.controller');
const { 
  validateRegisterInput, 
  validateLoginInput,
  validateRefreshTokenInput 
} = require('../middleware/validate.middleware');
const { 
  loginLimiter, 
  registerLimiter 
} = require('../middleware/rateLimiter.middleware');

const router = express.Router();

// Auth routes
router.post('/register', registerLimiter, validateRegisterInput, register);
router.post('/login', loginLimiter, validateLoginInput, login);
router.post('/verify-email', verifyEmail);
router.post('/refresh-token', validateRefreshTokenInput, refreshToken);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
