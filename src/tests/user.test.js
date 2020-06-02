const app = require('../server/app');
const request = require('supertest');

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/env');

describe('User', () => {
  describe('POST:/api/users', async () => {
    const userPayload = {
      name: 'Tsseract',
      username: 'admin',
      password: 'Admin.1234',
      email: 'admin@tsseract.com',
      birthDate: Date.now(),
    };
    let user;

    beforeAll(async (done) => {
      const adminUserExists = await request(app).get(`/api/users/u/admin`);

      if (adminUserExists) {
        await request(app).delete(
          `/api/users/${adminUserExists.body.data._id}`,
        );
      }

      user = await request(app).post('/api/users/').send(userPayload);

      done();
    });

    it('should create a new user in the DB with an _id property', () => {
      expect(user.body.data).toHaveProperty('_id');
    });

    it('should return a valid JWT in the response headers', () => {
      const token = user.headers['x-auth-token'];
      const verify = jwt.verify(token, JWT_KEY);

      expect(verify).toHaveProperty('id');
    });
  });
});
