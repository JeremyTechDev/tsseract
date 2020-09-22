import http from 'http';
import request from 'supertest';
import setCookie, { Cookie } from 'set-cookie-parser';

import server from '../server';

interface iUser {
  birthDate: number;
  email: string;
  name: string;
  password: string;
  user?: string;
  username: string;
}

describe('Posts', () => {
  const SUT = http.createServer(server({ dev: true }));

  const userPayload: iUser = {
    name: 'Tsseract',
    username: 'admin_posts_test',
    password: 'Admin.1234',
    email: 'admin_posts_test@tsseract.com',
    birthDate: Date.now(),
  };
  const postPayload = {
    title: 'Test Post',
    body: 'This is a test post',
    cover: '/testing/url/for/image',
  };
  let user: any, post: any, cookie: Cookie, cookieSet: [string], userId: string;

  beforeAll(async (done) => {
    user = await request(SUT).post('/api/users/').send(userPayload);
    userId = user.body.data._id;

    userPayload.user = userId;
    cookie = setCookie.parse(user)[0];
    cookieSet = [`${cookie.name}=${cookie.value}`];

    SUT.listen(done);
  });

  afterAll(async (done) => {
    const postId = post.body.data._id;

    await request(SUT).delete(`/api/posts/${postId}`).set('Cookie', cookieSet);

    await request(SUT).delete(`/api/users`).set('Cookie', cookieSet);

    SUT.close(done);
  });

  describe('POST:/api/posts', () => {
    it('should create a new post with just one tag', async () => {
      const newPostPayload = {
        ...postPayload,
        tags: ['TypeScript'],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      expect(post.body.data.tags.length).toBe(1);
      expect(post.body.data).toMatchObject({
        ...postPayload,
        user: userId,
      });
    });

    it('should create a new post with three tags', async () => {
      const newPostPayload = {
        ...postPayload,
        tags: ['TypeScript', 'Docker', 'MongoDB'],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      expect(post.body.data.tags.length).toBe(3);
      expect(post.body.data).toMatchObject({
        ...postPayload,
        user: userId,
      });
    });

    it('should return a status 400 if some fields are invalid', async () => {
      const newPostPayload = {
        ...postPayload,
        title: '',
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      expect(post.body).toHaveProperty('error');
      expect(post.status).toBe(400);
    });

    it('should return a status 400 if any tag is invalid', async () => {
      const newPostPayload = {
        ...postPayload,
        tags: ['Invalid tag'],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      expect(post.body).toHaveProperty('error');
      expect(post.status).toBe(400);
    });

    it('should create a new post with no tags', async () => {
      const newPostPayload = {
        ...postPayload,
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      expect(post.body.data.tags.length).toBe(0);
      expect(post.body.data).toMatchObject({
        ...postPayload,
        user: userId,
      });
    });
  });

  describe('PUT:/api/posts/like/:postId', () => {
    it('should like a post (add the user id to the likes array)', async () => {
      const likedPost = await request(SUT)
        .put(`/api/posts/like/${post.body.data._id}`)
        .set('Cookie', cookieSet);

      expect(likedPost.body.data.likes).toContain(userId);
    });

    it('should unlike a post (remove the user id to the likes array)', async () => {
      const likedPost = await request(SUT)
        .put(`/api/posts/like/${post.body.data._id}`)
        .set('Cookie', cookieSet);

      expect(likedPost.body.data.likes).not.toContain(userId);
    });
  });
});
