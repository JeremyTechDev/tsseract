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

describe('Comments', () => {
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

  describe('POST:/api/posts/c/:postId', () => {
    it('should add a comment into a post', async () => {
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      const newCommentPayload = {
        user: userId,
        body: 'Test comment',
      };

      const postWithComment = await request(SUT)
        .post(`/api/posts/c/${post.body.data._id}`)
        .set('Cookie', cookieSet)
        .send(newCommentPayload);

      expect(postWithComment.body.data.comments.length).toBeGreaterThan(0);
      expect(postWithComment.body.data.comments[0]).toMatchObject({
        ...newCommentPayload,
      });
    });

    it('should return a status 400 if the comment is invalid', async () => {
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      const newCommentPayload = {
        user: userId,
        body: 0,
      };

      const postWithComment = await request(SUT)
        .post(`/api/posts/c/${post.body.data._id}`)
        .set('Cookie', cookieSet)
        .send(newCommentPayload);

      expect(postWithComment.body).toHaveProperty('error');
      expect(postWithComment.status).toBe(400);
    });

    it('should return a status 404 the postId to comment is invalid', async () => {
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      const newCommentPayload = {
        user: userId,
        body: 'Comment',
      };

      const postWithComment = await request(SUT)
        .post(`/api/posts/c/InvalidID`)
        .set('Cookie', cookieSet)
        .send(newCommentPayload);

      expect(postWithComment.body).toHaveProperty('error');
      expect(postWithComment.status).toBe(404);
    });

    it('should return a status 404 the post to comment is not found', async () => {
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      const newCommentPayload = {
        user: userId,
        body: 'Comment',
      };

      const postWithComment = await request(SUT)
        .post(`/api/posts/c/${userId}`) // should be post id
        .set('Cookie', cookieSet)
        .send(newCommentPayload);

      expect(postWithComment.body).toHaveProperty('error');
      expect(postWithComment.status).toBe(404);
    });
  });

  describe('DELETE:/api/posts/c/:commentId', () => {
    it('should delete a comment in a post', async () => {
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      const newCommentPayload = {
        user: userId,
        body: 'Comment',
      };

      const postWithComment = await request(SUT)
        .post(`/api/posts/c/${post.body.data._id}`)
        .set('Cookie', cookieSet)
        .send(newCommentPayload);

      const deletedComment = await request(SUT)
        .delete(`/api/posts/c/${postWithComment.body.data.comments[0]._id}`)
        .set('Cookie', cookieSet);

      expect(deletedComment.body.data.comments.length).toBe(0);
    });

    it('should return status 404 if no comments where found with the given comment id', async () => {
      const newPostPayload = {
        ...postPayload,
        user: userId,
        tags: [],
      };

      post = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(newPostPayload);

      const newCommentPayload = {
        user: userId,
        body: 'Comment',
      };

      await request(SUT)
        .post(`/api/posts/c/${post.body.data._id}`)
        .set('Cookie', cookieSet)
        .send(newCommentPayload);

      const deletedComment = await request(SUT)
        .delete(`/api/posts/c/${post.body.data._id}`) // should be comment id
        .set('Cookie', cookieSet);

      expect(deletedComment.body).toHaveProperty('error');
      expect(deletedComment.status).toBe(404);
    });
  });
});
