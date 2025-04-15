const jwt = require('jsonwebtoken');
const Token = require('../models/token.model');

// Generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '15m' }
  );
};

// Generate refresh token
const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d' }
  );

  // Calculate expiration time
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  // Store in database
  await Token.create({
    userId: user._id,
    token: refreshToken,
    type: 'refresh',
    expiresAt
  });

  return refreshToken;
};

// Verify access token
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Verify refresh token
const verifyRefreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
    // Check if token exists in database
    const storedToken = await Token.findOne({ 
      token, 
      userId: decoded.id,
      type: 'refresh'
    });

    if (!storedToken) {
      throw new Error('Invalid refresh token');
    }

    return decoded;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

// Generate verification token
const generateVerificationToken = () => {
  // Create 6 digit code
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Delete refresh token (on logout)
const deleteRefreshToken = async (token) => {
  return await Token.deleteOne({ token, type: 'refresh' });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateVerificationToken,
  deleteRefreshToken
};
