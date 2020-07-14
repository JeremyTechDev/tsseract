const app = require('../server/app');
const request = require('supertest');

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../server/config/env');

describe('Auth', () => {
  const SUT = app({ isTesting: true });

  describe('POST:/api/auth', () => {
    const userPayload = {
      name: 'Tsseract',
      username: 'admin_auth_test',
      password: 'Admin.1234',
      email: 'admin_auth_test@tsseract.com',
      birthDate: Date.now(),
    };
    let user;

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

    it('should return a valid JWT with an id as a property', async () => {
      const res = await request(SUT).post('/api/auth/').send({
        username: 'admin_auth_test',
        password: 'Admin.1234',
      });

      const token = res.headers['x-auth-token'];
      const verify = jwt.verify(token, JWT_KEY);

      expect(verify).toHaveProperty('id');
    });
  });
});
