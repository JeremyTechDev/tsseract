import app from '../app';
import request from 'supertest';

import jwt from 'jsonwebtoken';
const { JWT_KEY } = require('../config/env');

describe('User', () => {
  const SUT = app({ isTesting: true });

  describe('POST:/api/users', () => {
    const userPayload = {
      name: 'Tsseract',
      username: 'admin_user_test',
      password: 'Admin.1234',
      email: 'admin_user_test@tsseract.com',
      birthDate: Date.now(),
    };
    let user: any;

    beforeAll(async (done) => {
      user = await request(SUT).post('/api/users/').send(userPayload);
      done();
    });

    afterAll(async (done) => {
      const userId = user.body.data._id;
      await request(SUT)
        .delete(`/api/users/${userId}`)
        .set('x-auth-token', user.headers['x-auth-token']);
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
