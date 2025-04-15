const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');
const { 
  authenticate, 
  authorize 
} = require('../middleware/auth.middleware');
const {
  createProductRules,
  updateProductRules,
  paginationRules
} = require('../middleware/validate.middleware');

const router = express.Router();

// Public routes - no authentication needed
router.get('/', paginationRules, getAllProducts);
router.get('/:id', getProductById);

// Protected routes - authentication required
router.use(authenticate);

// Admin only routes
router.post('/', authorize('admin'), createProductRules, createProduct);
router.put('/:id', authorize('admin'), updateProductRules, updateProduct);
router.delete('/:id', authorize('admin'), deleteProduct);

module.exports = router;
