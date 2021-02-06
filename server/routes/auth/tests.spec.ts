import http from 'http';
import request from 'supertest';
import setCookie, { Cookie } from 'set-cookie-parser';

import server from '../../server';

const userProps = ['_id', 'email', 'name', 'googleId', 'avatar'];

describe('Auth', () => {
  const SUT = http.createServer(server({ dev: true }));
  const userPayload = {
    name: 'Tsseract',
    password: 'Admin.1234',
    email: 'admin_user_test@tsseract.com',
  };
  let user: any, cookie: Cookie;
  let cookieSet: [string], googleCookieSet: [string];

  beforeAll(async (done) => {
    user = await request(SUT).post('/api/users/').send(userPayload);
    cookie = setCookie.parse(user)[0];
    cookieSet = [`${cookie.name}=${cookie.value}`];

    SUT.listen(done);
  });

  afterAll(async (done) => {
    await request(SUT).delete('/api/users/').set('Cookie', cookieSet);
    await request(SUT).delete('/api/users/').set('Cookie', googleCookieSet);

    SUT.close(done);
  });

  describe('GET:/api/auth', () => {
    it('should return the data of the authenticated user', async () => {
      const authUser = await request(SUT)
        .get('/api/auth')
        .set('Cookie', cookieSet);

      const { name, email } = userPayload;
      expect(authUser.body).toMatchObject({
        _id: user.body._id,
        email,
        name,
        googleId: null,
      });
    });
  });

  describe('POST:/api/auth/login', () => {
    it('should authenticate a user with', async () => {
      const authUser = await request(SUT)
        .post('/api/auth/login')
        .send({ email: userPayload.email, password: userPayload.password });

      expect(authUser.header).toHaveProperty('set-cookie');
      expect(cookie).toHaveProperty('name');
      expect(cookie).toHaveProperty('value');
      expect(cookie.name).toEqual('tsseract-auth-token');
      userProps.forEach((p) => expect(authUser.body).toHaveProperty(p));
    });

    it('should return a status code 400 if the email or password are invalid', async () => {
      const authUser = await request(SUT)
        .post('/api/auth/login')
        .send({ email: 'test@email.com', password: 'invalid password' });

      expect(authUser.status).toBe(400);
      expect(authUser.body).toHaveProperty('error');
    });

    it('should return 400 if the user is not found or the user is a google user', async () => {
      const authUser = await request(SUT)
        .post('/api/auth/login')
        .send({ email: 'test@google.com', password: '12345678' });

      expect(authUser.status).toBe(400);
      expect(authUser.body).toHaveProperty('error');
    });

    it('should return a status code 400 if the email or password are incorrect', async () => {
      const authUser = await request(SUT)
        .post('/api/auth/login')
        .send({ email: userPayload.email, password: '12345678' });

      expect(authUser.status).toBe(400);
      expect(authUser.body).toHaveProperty('error');
    });
  });

  describe('POST:/api/auth/g/', () => {
    it('should authenticate new a user using a google id', async () => {
      const authUser: any = await request(SUT).post('/api/auth/g/').send({
        email: 'test@google.com',
        googleId: '123456789',
        name: 'Tsseract',
      });

      const cookie = setCookie.parse(authUser)[0];
      googleCookieSet = [`${cookie.name}=${cookie.value}`];

      expect(authUser.header).toHaveProperty('set-cookie');
      expect(cookie).toHaveProperty('name');
      expect(cookie).toHaveProperty('value');
      expect(cookie.name).toEqual('tsseract-auth-token');
      expect(authUser.body.isNew).toBeTruthy();
      userProps.forEach((p) => expect(authUser.body).toHaveProperty(p));
    });

    it('should authenticate an existing user with a google id', async () => {
      const authUser = await request(SUT).post('/api/auth/g/').send({
        email: 'test@google.com',
        googleId: '123456789',
        name: 'Tsseract',
      });

      expect(authUser.header).toHaveProperty('set-cookie');
      expect(cookie).toHaveProperty('name');
      expect(cookie).toHaveProperty('value');
      expect(cookie.name).toEqual('tsseract-auth-token');
      expect(authUser.body.isNew).toBeFalsy();
      userProps.forEach((p) => expect(authUser.body).toHaveProperty(p));
    });

    it('should return 400 if some fields are missing in the body', async () => {
      const authUser = await request(SUT).post('/api/auth/g/').send({
        googleId: '123456789',
        name: 'Tsseract',
      });

      expect(authUser.status).toBe(400);
      expect(authUser.body).toHaveProperty('error');
    });

    it('should return 400 if a new google id is sent but the email is taken', async () => {
      const authUser = await request(SUT).post('/api/auth/g/').send({
        email: 'admin_user_test@tsseract.com',
        googleId: '987654321',
        name: 'Tsseract',
      });

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
      expect(deauthUser.body).toHaveProperty('_id');
      expect(newCookie.name).toEqual('tsseract-auth-token');
      expect(newCookie.value).toEqual('');
    });
  });
});
