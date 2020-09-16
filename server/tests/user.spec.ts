import http from 'http';
import request from 'supertest';
import setCookie from 'set-cookie-parser';

import server from '../server';

const userProps = ['_id', 'birthDate', 'email', 'name', 'username'];

describe('User', () => {
  const SUT = http.createServer(server({ dev: true }));
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

    SUT.listen(done);
  });

  afterAll(async (done) => {
    const [cookie] = cookies;

    await request(SUT)
      .delete(`/api/users/`)
      .set('Cookie', [`${cookie.name}=${cookie.value}`]);

    SUT.close(done);
  });

  describe('POST:/api/users', () => {
    it('should create a new user', () => {
      userProps.forEach((p) => expect(user.body.data).toHaveProperty(p));
    });

    it('should not created a new user if any param is invalid', async () => {
      const user = await request(SUT)
        .post('/api/users/')
        .send({ ...userPayload, username: 'invalid username' });

      expect(user.status).toBe(400);
      expect(user.body).toHaveProperty('error');
    });

    it('should not create a new user if the username or email is taken', async () => {
      const user = await request(SUT).post('/api/users/').send(userPayload); // recreating the same user as above

      expect(user.status).toBe(409);
      expect(user.body).toHaveProperty('error');
    });
  });

  describe('GET:/api/users/:id', () => {
    it('should retrieve a user by id', async () => {
      const newUser = await request(SUT).get(
        `/api/users/${user.body.data._id}`,
      );

      userProps.forEach((p) => expect(newUser.body.data).toHaveProperty(p));
      expect(newUser.body.data.username).toBe('admin_user_test');
    });

    it('should return a status 404 if no user is found with the given id', async () => {
      const user = await request(SUT).get(
        `/api/users/5ee17b00d1fccf00d2b39194`,
      );

      expect(user.status).toBe(404);
      expect(user.body).toHaveProperty('error');
    });
  });

  describe('GET:/api/users/u/:username', () => {
    it('should retrieve a user by username', async () => {
      const user = await request(SUT).get(`/api/users/u/admin_user_test`);

      userProps.forEach((p) => expect(user.body.data).toHaveProperty(p));
      expect(user.body.data.username).toBe('admin_user_test');
    });

    it('should return a status 404 if no user is found with the given username', async () => {
      const user = await request(SUT).get(`/api/users/u/unexisteningUser`);

      expect(user.status).toBe(404);
      expect(user.body).toHaveProperty('error');
    });
  });

  describe('DELETE:/api/users/', () => {
    it('should delete a user', async () => {
      const userToDelete: any = await request(SUT).post('/api/users/').send({
        name: 'Tsseract',
        username: 'delete_user_test',
        password: 'Admin.1234',
        email: 'delete_user_test@tsseract.com',
        birthDate: Date.now(),
      });
      const [newCookie] = setCookie.parse(userToDelete);

      const deleted = await request(SUT)
        .delete(`/api/users/`)
        .set('Cookie', [`${newCookie.name}=${newCookie.value}`]);

      expect(deleted.status).toBe(204);
    });
  });
});
