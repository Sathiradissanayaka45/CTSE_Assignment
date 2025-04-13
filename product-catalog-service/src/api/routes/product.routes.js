const express = require('express');
const { check } = require('express-validator');
const productController = require('../controllers/product.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// GET /api/products - Get all products
router.get('/', productController.getAllProducts);

// GET /api/products/search - Search products
router.get('/search', productController.searchProducts);

// GET /api/products/:id - Get single product
router.get('/:id', productController.getProductById);

// POST /api/products - Create product (admin only)
router.post('/',
  [
    authenticate,
    authorize('admin'),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('price', 'Price must be a positive number').isFloat({ gt: 0 }),
      check('category', 'Category is required').not().isEmpty()
    ]
  ],
  productController.createProduct
);

// PUT /api/products/:id - Update product (admin only)
router.put('/:id',
  [
    authenticate,
    authorize('admin'),
    [
      check('name', 'Name is required').optional().not().isEmpty(),
      check('price', 'Price must be a positive number').optional().isFloat({ gt: 0 })
    ]
  ],
  productController.updateProduct
);

// DELETE /api/products/:id - Delete product (admin only)
router.delete('/:id', 
  [authenticate, authorize('admin')],
  productController.deleteProduct
);

module.exports = router;