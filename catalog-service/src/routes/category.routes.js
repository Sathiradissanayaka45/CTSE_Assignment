const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  getProductsByCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');
const { 
  authenticate, 
  authorize 
} = require('../middleware/auth.middleware');
const {
  createCategoryRules,
  updateCategoryRules,
  paginationRules
} = require('../middleware/validate.middleware');

const router = express.Router();

// Public routes - no authentication needed
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.get('/:id/products', paginationRules, getProductsByCategory);

// Protected routes - authentication required
router.use(authenticate);

// Admin only routes
router.post('/', authorize('admin'), createCategoryRules, createCategory);
router.put('/:id', authorize('admin'), updateCategoryRules, updateCategory);
router.delete('/:id', authorize('admin'), deleteCategory);

module.exports = router;
