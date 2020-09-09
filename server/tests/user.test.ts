import http from 'http';
import request from 'supertest';
import setCookie from 'set-cookie-parser';

import server from '../server';

describe('User', () => {
  const SUT = http.createServer(server({ isTesting: true, dev: true }));

  describe('POST:/api/users', () => {
    const userPayload = {
      name: 'Tsseract',
      username: 'admin_user_test',
      password: 'Admin.1234',
      email: 'admin_user_test@tsseract.com',
      birthDate: Date.now(),
    };
    let user: any, cookies: any;

    beforeAll(async (done) => {
      user = await request(SUT).post('/api/users/').send(userPayload);
      cookies = setCookie.parse(user);
      done();
    });

    afterAll(async (done) => {
      const [cookie] = cookies;

      await request(SUT)
        .delete(`/api/users/`)
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`]);

      SUT.close();
      done();
    });

    it('should create a new user in the DB with the user properties', () => {
      expect(user.body.data).toHaveProperty('_id');
      expect(user.body.data).toHaveProperty('birthDate');
      expect(user.body.data).toHaveProperty('email');
      expect(user.body.data).toHaveProperty('name');
      expect(user.body.data).toHaveProperty('username');
    });

    it('should set a cookie', () => {
      expect(user.header).toHaveProperty('set-cookie');
    });

    test('should set tsseract-auth-token cookie', () => {
      cookies.forEach((cookie: any) => {
        expect(cookie).toHaveProperty('name');
        expect(cookie.name).toEqual('tsseract-auth-token');
      });
    });
  });
});
