const express = require('express');
const { 
  getMe, 
  updateProfile, 
  changePassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Protected routes
router.use(protect);

// User routes
router.get('/me', getMe);
router.put('/update-profile', updateProfile);
router.put('/change-password', changePassword);

// Admin routes - requires admin role
router.use(authorize('admin'));
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
