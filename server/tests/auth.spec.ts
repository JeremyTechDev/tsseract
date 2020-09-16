import http from 'http';
import request from 'supertest';
import setCookie from 'set-cookie-parser';

import server from '../server';

const userProperties = ['_id', 'birthDate', 'email', 'name', 'username'];

describe('Auth', () => {
  const SUT = http.createServer(server({ dev: true }));

  describe('POST:/api/auth', () => {
    const userPayload = {
      name: 'Tsseract',
      username: 'admin_user_test',
      password: 'Admin.1234',
      email: 'admin_user_test@tsseract.com',
      birthDate: Date.now(),
    };
    let user: any, cookie: any;

    beforeAll(async (done) => {
      user = await request(SUT).post('/api/users/').send(userPayload);
      cookie = setCookie.parse(user)[0];

      SUT.listen(done);
    });

    afterAll(async (done) => {
      await request(SUT)
        .delete(`/api/users/`)
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`]);

      SUT.close(done);
    });

    it('should authenticate a new created user', async () => {
      const authUser = await request(SUT)
        .post('/api/auth/')
        .send({ username: 'admin_user_test', password: 'Admin.1234' });

      expect(authUser.header).toHaveProperty('set-cookie');
      userProperties.forEach((property) =>
        expect(authUser.body.data).toHaveProperty(property),
      );
    });

    it('should set tsseract-auth-token in a new cookie', () => {
      expect(user.header).toHaveProperty('set-cookie');
      expect(cookie).toHaveProperty('name');
      expect(cookie.name).toEqual('tsseract-auth-token');
    });

    it('should return a status code 400 if the username or password are invalid', async () => {
      const authUser = await request(SUT)
        .post('/api/auth/')
        .send({ username: 'fake_user', password: 'invalid password' });

      expect(authUser.status).toBe(400);
    });

    it('should deauthenticate a user', async () => {
      const deauthUser: any = await request(SUT)
        .post('/api/auth/logout/')
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`]);
      const [newCookie] = setCookie.parse(deauthUser);

      expect(deauthUser.header).toHaveProperty('set-cookie');
      expect(deauthUser.body.data).toHaveProperty('oldCookie');
      expect(newCookie.name).toEqual('tsseract-auth-token');
      expect(newCookie.value).toEqual('');
    });
  });
});
