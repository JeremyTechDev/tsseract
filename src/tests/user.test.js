const app = require('../server/app');
const request = require('supertest');

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/env');

describe('User', () => {
  const sut = app(true);

  describe('POST:/api/users', () => {
    const userPayload = {
      name: 'Tsseract',
      username: 'admin_user_test',
      password: 'Admin.1234',
      email: 'admin_user_test@tsseract.com',
      birthDate: Date.now(),
    };
    let user;

    beforeAll(async (done) => {
      user = await request(sut).post('/api/users/').send(userPayload);
      done();
    });

    afterAll(async (done) => {
      const userId = user.body.data._id;
      await request(sut)
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
