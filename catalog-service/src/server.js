const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'Product Catalog Service',
    status: 'active',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Catalog Service running on port ${PORT}`);
});

module.exports = app;
