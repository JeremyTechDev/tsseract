const app = require('../server/app');
const request = require('supertest');

describe('Posts', () => {
  const sut = app(true);

  describe('POST:api/posts', () => {
    const userPayload = {
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

    let user, userId, post;

    beforeAll(async (done) => {
      user = await request(sut).post('/api/users/').send(userPayload);
      userId = user.body.data._id;

      done();
    });

    afterAll(async (done) => {
      const postId = post.body.data._id;

      await request(sut)
        .delete(`/api/posts/${userId}/${postId}`)
        .set('x-auth-token', user.headers['x-auth-token']);

      await request(sut)
        .delete(`/api/users/${userId}`)
        .set('x-auth-token', user.headers['x-auth-token']);

      done();
    });

    it('should create a new post with just one tag', async () => {
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: ['TypeScript'],
      };

      post = await request(sut)
        .post('/api/posts')
        .set('x-auth-token', user.headers['x-auth-token'])
        .send(newPostPayload);

      expect(post.body.data.tags.length).toBe(1);
      expect(post.body.data.post).toMatchObject({
        ...postPayload,
        user: userId,
      });
    });

    it('should create a new post with no tag', async () => {
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: [],
      };

      post = await request(sut)
        .post('/api/posts')
        .set('x-auth-token', user.headers['x-auth-token'])
        .send(newPostPayload);

      expect(post.body.data.tags.length).toBe(0);
      expect(post.body.data.post).toMatchObject({
        ...postPayload,
        user: userId,
      });
    });

    it('should create a new post with no tag', async () => {
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: ['TypeScript', 'Docker', 'MongoDB'],
      };

      post = await request(sut)
        .post('/api/posts')
        .set('x-auth-token', user.headers['x-auth-token'])
        .send(newPostPayload);

      expect(post.body.data.tags.length).toBe(3);
      expect(post.body.data.post).toMatchObject({
        ...postPayload,
        user: userId,
      });
    });
  });
});
