const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user.model');

// Connect to test database before tests
beforeAll(async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-service-test';
  await mongoose.connect(mongoURI);
});

// Clear test data after each test
afterEach(async () => {
  await User.deleteMany({});
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  // Test registration endpoint
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123!'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should fail if email already exists', async () => {
      // Create a test user first
      await User.create({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'Password123!'
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Another User',
          email: 'existing@example.com',
          password: 'Password123!'
        });
      
      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // Test login endpoint
  describe('POST /api/auth/login', () => {
    it('should login a user with correct credentials', async () => {
      // Create a verified test user
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        isVerified: true
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Password123!'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
    });

    it('should fail with incorrect password', async () => {
      // Create a verified test user
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        isVerified: true
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword123!'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});
