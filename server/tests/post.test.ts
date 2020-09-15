import http from 'http';
import request from 'supertest';
import setCookie from 'set-cookie-parser';

import server from '../server';

describe('Posts', () => {
  const SUT = http.createServer(server({ isTesting: true, dev: true }));

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

    let user: any, post: any, cookies: any, userId: string;

    beforeAll(async (done) => {
      user = await request(SUT).post('/api/users/').send(userPayload);
      cookies = setCookie.parse(user);
      userId = user.body.data._id;

      SUT.listen(done);
    });

    afterAll(async (done) => {
      const postId = post.body.data._id;
      const [cookie] = cookies;

      await request(SUT)
        .delete(`/api/posts/${postId}`)
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`]);

      await request(SUT)
        .delete(`/api/users`)
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`]);

      SUT.close(done);
    });

    it('should create a new post with just one tag', async () => {
      const [cookie] = cookies;
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: ['TypeScript'],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`])
        .send(newPostPayload);

      expect(post.body.data.tags.length).toBe(1);
      expect(post.body.data).toMatchObject({
        ...postPayload,
        user: userId,
      });
    });

    it('should create a new post with no tag', async () => {
      const [cookie] = cookies;
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`])
        .send(newPostPayload);

      expect(post.body.data.tags.length).toBe(0);
      expect(post.body.data).toMatchObject({
        ...postPayload,
        user: userId,
      });
    });

    it('should create a new post with three tags', async () => {
      const [cookie] = cookies;
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: ['TypeScript', 'Docker', 'MongoDB'],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`])
        .send(newPostPayload);

      expect(post.body.data.tags.length).toBe(3);
      expect(post.body.data).toMatchObject({
        ...postPayload,
        user: userId,
      });
    });

    it('should add a comment into a post', async () => {
      const [cookie] = cookies;
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`])
        .send(newPostPayload);

      const newCommentPayload = {
        user: userId,
        body: 'Test comment',
      };

      const postWithComment = await request(SUT)
        .post(`/api/posts/c/${post.body.data._id}`)
        .set('Cookie', [`tsseract-auth-token=${cookie.value}`])
        .send({ ...newCommentPayload });

      expect(postWithComment.body.data.comments.length).toBeGreaterThan(0);
      expect(postWithComment.body.data.comments[0]).toMatchObject({
        ...newCommentPayload,
      });
    });
  });
});
