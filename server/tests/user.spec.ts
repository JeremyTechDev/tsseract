import http from 'http';
import request from 'supertest';
import setCookie, { Cookie } from 'set-cookie-parser';

import server from '../server';

const userProps = ['_id', 'email', 'name'];

describe('User', () => {
  const SUT = http.createServer(server({ dev: true }));
  const userPayload = {
    name: 'Tsseract',
    password: 'Admin.1234',
    email: 'admin_user_test@tsseract.com',
  };
  let user: any, secUser: any, cookie: Cookie, secondCookie: any;
  let cookieSet: [string];

  beforeAll(async (done) => {
    user = await request(SUT).post('/api/users/').send(userPayload);
    cookie = setCookie.parse(user)[0];
    cookieSet = [`${cookie.name}=${cookie.value}`];

    secUser = await request(SUT).post('/api/users/').send({
      name: 'Second',
      password: '12345678',
      email: 'secondUser@tsseract.com',
    });
    secondCookie = setCookie.parse(secUser)[0];

    SUT.listen(done);
  });

  afterAll(async (done) => {
    await request(SUT).delete(`/api/users/`).set('Cookie', cookieSet);
    await request(SUT)
      .delete(`/api/users/`)
      .set('Cookie', [`${secondCookie.name}=${secondCookie.value}`]);

    SUT.close(done);
  });

  describe('POST:/api/users', () => {
    it('should create a new authenticated user', () => {
      userProps.forEach((p) => expect(user.body).toHaveProperty(p));
      expect(user.header).toHaveProperty('set-cookie');
      expect(cookie).toHaveProperty('name');
      expect(cookie).toHaveProperty('value');
      expect(cookie.name).toEqual('tsseract-auth-token');
    });

    it('should not created a new user if any param is invalid', async () => {
      const user = await request(SUT)
        .post('/api/users/')
        .send({ ...userPayload, email: 'invalid email' });

      expect(user.status).toBe(400);
      expect(user.body).toHaveProperty('error');
    });

    it('should not create a new user if the email or email is taken', async () => {
      const user = await request(SUT).post('/api/users/').send(userPayload); // recreating the same user as above

      expect(user.status).toBe(409);
      expect(user.body).toHaveProperty('error');
    });
  });

  describe('GET:/api/users/:id', () => {
    it('should retrieve a user by id', async () => {
      const newUser = await request(SUT).get(`/api/users/${user.body._id}`);

      userProps.forEach((p) => expect(newUser.body).toHaveProperty(p));
      expect(newUser.body._id).toBe(user.body._id);
    });

    it('should return a status 404 if no user is found with the given id', async () => {
      const user = await request(SUT).get(
        `/api/users/5ee17b00d1fccf00d2b39194`,
      );

      expect(user.status).toBe(404);
      expect(user.body).toHaveProperty('error');
    });
  });

  // FIXME
  // describe('GET:/api/users/u/:googleId', () => {
  //   it('should retrieve a user by googleId', async () => {
  //     const user = await request(SUT).get(`/api/users/u/admin_user_test`);

  //     userProps.forEach((p) => expect(user.body).toHaveProperty(p));
  //     expect(user.body.googleId).toBe('admin_user_test');
  //   });

  //   it('should return a status 404 if no user is found with the given username', async () => {
  //     const user = await request(SUT).get(`/api/users/u/inexistentUser`);

  //     expect(user.status).toBe(404);
  //     expect(user.body).toHaveProperty('error');
  //   });
  // });

  describe('PUT:/api/users/', () => {
    it('should update some fields of a user', async () => {
      const user = await request(SUT)
        .put('/api/users/')
        .set('Cookie', cookieSet)
        .send({ avatar: 'avatar' });

      expect(user.status).toBe(200);
      expect(user.body.avatar).toBe('avatar');
      expect(user.body).toMatchObject({
        email: userPayload.email,
        name: userPayload.name,
      });
    });

    it('should return 400 if an unchangeable field is set to change', async () => {
      const user = await request(SUT)
        .put('/api/users/')
        .set('Cookie', cookieSet)
        .send({ password: 'password' });

      expect(user.status).toBe(400);
      expect(user.body).toHaveProperty('error');
    });
  });

  describe('PUT:/api/users/toggle-follow/:followToId', () => {
    it('should follow a user that is not being followed by the auth user', async () => {
      const follow = await request(SUT)
        .put('/api/users/toggle-follow/' + secUser.body._id)
        .set('Cookie', cookieSet);

      expect(follow.body).toHaveProperty('following');
      expect(follow.body).toHaveProperty('follower');
      expect(follow.body.follower.followers).toContain(user.body._id);
      expect(follow.body.following.following).toContain(secUser.body._id);
      expect(follow.body.action).toBe('follow');
    });

    it('should tell if the user is trying to follow an inexistent account', async () => {
      const follow = await request(SUT)
        .put('/api/users/toggle-follow/600db2ee05b9cdc7332a9dca')
        .set('Cookie', cookieSet);

      expect(follow.status).toBe(404);
      expect(follow.body).toHaveProperty('error');
    });

    it('should not allow the user to follow their own account', async () => {
      const follow = await request(SUT)
        .put('/api/users/toggle-follow/' + user.body._id)
        .set('Cookie', cookieSet);

      expect(follow.status).toBe(409);
      expect(follow.body).toHaveProperty('error');
    });

    it('should unfollow a user that is already followed by the auth user', async () => {
      const follow = await request(SUT)
        .put('/api/users/toggle-follow/' + secUser.body._id)
        .set('Cookie', cookieSet);

      expect(follow.body).toHaveProperty('following');
      expect(follow.body).toHaveProperty('follower');
      expect(follow.body.follower.followers).not.toContain(user.body._id);
      expect(follow.body.following.following).not.toContain(secUser.body._id);
      expect(follow.body.action).toBe('unfollow');
    });
  });

  describe('DELETE:/api/users/', () => {
    it('should delete a user', async () => {
      const userToDelete: any = await request(SUT).post('/api/users/').send({
        name: 'Tsseract',
        password: 'Admin.1234',
        email: 'delete_user_test@tsseract.com',
      });
      const [newCookie] = setCookie.parse(userToDelete);

      const deleted = await request(SUT)
        .delete(`/api/users/`)
        .set('Cookie', [`${newCookie.name}=${newCookie.value}`]);

      expect(deleted.status).toBe(200);
    });
  });
});
