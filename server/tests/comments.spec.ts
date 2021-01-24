import http from 'http';
import request from 'supertest';
import setCookie, { Cookie } from 'set-cookie-parser';

import server from '../server';

interface iUser {
  email: string;
  name: string;
  password: string;
  user?: string;
}

describe('Comments', () => {
  const SUT = http.createServer(server({ dev: true }));

  const userPayload: iUser = {
    name: 'Tsseract',
    password: 'Admin.1234',
    email: 'admin_posts_test@tsseract.com',
  };
  const postPayload = {
    title: 'Test Post',
    body: 'This is a test post',
    cover: '/testing/url/for/image',
  };
  let user: any, post: any, cookie: Cookie, cookieSet: [string], userId: string;

  beforeAll(async (done) => {
    user = await request(SUT).post('/api/users/').send(userPayload);
    userId = user.body._id;

    userPayload.user = userId;
    cookie = setCookie.parse(user)[0];
    cookieSet = [`${cookie.name}=${cookie.value}`];

    SUT.listen(done);
  });

  afterAll(async (done) => {
    const postId = post.body._id;

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

      const postWithComment = await request(SUT)
        .post(`/api/posts/c/${post.body._id}`)
        .set('Cookie', cookieSet)
        .send({ body: 'Test comment' });

      expect(postWithComment.body.comments.length).toBeGreaterThan(0);
      expect(postWithComment.body.comments[0].body).toBe('Test comment');
      expect(postWithComment.body.interactions).toBe(1);
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
        .post(`/api/posts/c/${post.body._id}`)
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
        .post(`/api/posts/c/${post.body._id}`)
        .set('Cookie', cookieSet)
        .send(newCommentPayload);

      const deletedComment = await request(SUT)
        .delete(`/api/posts/c/${postWithComment.body.comments[0]._id}`)
        .set('Cookie', cookieSet);

      expect(deletedComment.body.comments.length).toBe(0);
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
        .post(`/api/posts/c/${post.body._id}`)
        .set('Cookie', cookieSet)
        .send(newCommentPayload);

      const deletedComment = await request(SUT)
        .delete(`/api/posts/c/${post.body._id}`) // should be comment id
        .set('Cookie', cookieSet);

      expect(deletedComment.body).toHaveProperty('error');
      expect(deletedComment.status).toBe(404);
    });
  });
});
