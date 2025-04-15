const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const { Product, Category } = require('../src/models');

// Mock JWT middleware
jest.mock('../src/middleware/auth.middleware', () => ({
  authenticate: (req, res, next) => {
    req.user = { id: 'test-user-id', role: 'admin' };
    next();
  },
  authorize: () => (req, res, next) => next()
}));

describe('Product API', () => {
  let testCategory;
  
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/catalog-service-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Create a test category
    testCategory = await Category.create({
      name: 'Test Category',
      description: 'For testing purposes',
      slug: 'test-category'
    });
  });
  
  afterAll(async () => {
    // Clean up database
    await Product.deleteMany({});
    await Category.deleteMany({});
    
    // Close database connection
    await mongoose.connection.close();
  });
  
  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const res = await request(app).get('/api/products');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBeTruthy();
    });
  });
  
  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        stock: 50,
        category: testCategory._id
      };
      
      const res = await request(app)
        .post('/api/products')
        .send(productData);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('name', 'Test Product');
      expect(res.body.data).toHaveProperty('slug', 'test-product');
    });
  });
});
