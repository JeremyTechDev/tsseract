const app = require('../server/app');
const request = require('supertest');

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/env');

describe('Auth', () => {
  describe('POST:/api/auth', () => {
    beforeAll(async (done) => {
      await request(app).post('/api/users/').send({
        name: 'Tsseract',
        username: 'admin',
        password: 'Admin.1234',
        email: 'admin@tsseract.com',
        birthDate: Date.now(),
      });

      done();
    });

    it('should return a valid JWT with an id as a property', async () => {
      const res = await request(app).post('/api/auth/').send({
        username: 'admin',
        password: 'Admin.1234',
      });

      const token = res.headers['x-auth-token'];
      const verify = jwt.verify(token, JWT_KEY);

      expect(verify).toHaveProperty('id');
    });
  });
});
