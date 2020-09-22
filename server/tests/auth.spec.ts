import http from 'http';
import request from 'supertest';
import setCookie, { Cookie } from 'set-cookie-parser';

import server from '../server';

const userProps = ['_id', 'birthDate', 'email', 'name', 'username'];

describe('Auth', () => {
  const SUT = http.createServer(server({ dev: true }));
  const userPayload = {
    name: 'Tsseract',
    username: 'admin_user_test',
    password: 'Admin.1234',
    email: 'admin_user_test@tsseract.com',
    birthDate: Date.now(),
  };
  let user: any, cookie: Cookie;
  let cookieSet: [string];

  beforeAll(async (done) => {
    user = await request(SUT).post('/api/users/').send(userPayload);
    cookie = setCookie.parse(user)[0];
    cookieSet = [`${cookie.name}=${cookie.value}`];

    SUT.listen(done);
  });

  afterAll(async (done) => {
    await request(SUT).delete(`/api/users/`).set('Cookie', cookieSet);

    SUT.close(done);
  });

  describe('POST:/api/auth/', () => {
    it('should authenticate a user with', async () => {
      const authUser = await request(SUT)
        .post('/api/auth/')
        .send({ username: 'admin_user_test', password: 'Admin.1234' });

      expect(authUser.header).toHaveProperty('set-cookie');
      expect(cookie).toHaveProperty('name');
      expect(cookie).toHaveProperty('value');
      expect(cookie.name).toEqual('tsseract-auth-token');
      userProps.forEach((p) => expect(authUser.body.data).toHaveProperty(p));
    });

    it('should return a status code 400 if the username or password are invalid', async () => {
      const authUser = await request(SUT)
        .post('/api/auth/')
        .send({ username: 'fake_user', password: 'invalid password' });

      expect(authUser.status).toBe(400);
      expect(authUser.body).toHaveProperty('error');
    });

    it('should return a status code 400 if the username or password are incorrect', async () => {
      const authUser = await request(SUT)
        .post('/api/auth/')
        .send({ username: 'admin_user_test', password: '12345678' });

      expect(authUser.status).toBe(400);
      expect(authUser.body).toHaveProperty('error');
    });
  });

  describe('POST:/api/auth/logout/', () => {
    it('should deauthenticate a user and clear the auth token', async () => {
      const deauthUser: any = await request(SUT)
        .post('/api/auth/logout/')
        .set('Cookie', cookieSet);
      const [newCookie] = setCookie.parse(deauthUser);

      expect(deauthUser.header).toHaveProperty('set-cookie');
      expect(deauthUser.body.data).toHaveProperty('oldCookie');
      expect(newCookie.name).toEqual('tsseract-auth-token');
      expect(newCookie.value).toEqual('');
    });
  });
});
