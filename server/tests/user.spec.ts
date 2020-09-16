import http from 'http';
import request from 'supertest';
import setCookie from 'set-cookie-parser';

import server from '../server';

const userProperties = ['_id', 'birthDate', 'email', 'name', 'username'];

describe('User', () => {
  const SUT = http.createServer(server({ dev: true }));

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

      SUT.listen(done);
    });

    afterAll(async (done) => {
      const [cookie] = cookies;

      await request(SUT)
        .delete(`/api/users/`)
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`]);

      SUT.close(done);
    });

    it('should create a new user', () => {
      userProperties.forEach((property) =>
        expect(user.body.data).toHaveProperty(property),
      );
    });

    it('should retrieve a user by username', async () => {
      const users = await request(SUT).get(`/api/users/u/admin_user_test`);

      userProperties.forEach((property) =>
        expect(users.body.data).toHaveProperty(property),
      );
      expect(users.body.data.username).toBe('admin_user_test');
    });

    it('should retrieve a user by id', async () => {
      const users = await request(SUT).get(`/api/users/${user.body.data._id}`);

      userProperties.forEach((property) =>
        expect(users.body.data).toHaveProperty(property),
      );
      expect(users.body.data.username).toBe('admin_user_test');
    });
  });
});
