const express = require('express');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');

const router = express.Router();

// API Routes
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
