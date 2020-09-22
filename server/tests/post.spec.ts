import http from 'http';
import request from 'supertest';
import setCookie from 'set-cookie-parser';

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
  const secondUserPayload: iUser = {
    ...userPayload,
    username: 'admin_posts_test_2',
    email: 'admin_posts_test_2@tsseract.com',
  };
  const postPayload = {
    title: 'Test Post',
    body: 'This is a test post',
    cover: '/testing/url/for/image',
  };
  let user: any,
    cookieSet: [string],
    post: any,
    secondUser: any,
    secUserCookieSet: [string],
    userId: string;

  beforeAll(async (done) => {
    user = await request(SUT).post('/api/users/').send(userPayload);
    userId = user.body.data._id;
    userPayload.user = userId;
    const cookie = setCookie.parse(user)[0];
    cookieSet = [`${cookie.name}=${cookie.value}`];

    secondUser = await request(SUT).post('/api/users/').send(secondUserPayload);
    const secUserCookie = setCookie.parse(secondUser)[0];
    secUserCookieSet = [`${secUserCookie.name}=${secUserCookie.value}`];

    SUT.listen(done);
  });

  afterAll(async (done) => {
    const postId = post.body.data._id;

    await request(SUT).delete(`/api/posts/${postId}`).set('Cookie', cookieSet);

    await request(SUT).delete(`/api/users`).set('Cookie', cookieSet);
    await request(SUT).delete(`/api/users`).set('Cookie', secUserCookieSet);

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

  describe('GET:/api/posts/by/:id', () => {
    it('should return list of post by an user', async () => {
      const postsBy = await request(SUT)
        .get(`/api/posts/by/${userId}`)
        .set('Cookie', cookieSet);

      const errorOnRequest = postsBy.body.data.some(
        ({ user }: { user: string }) => user !== userId,
      );

      expect(errorOnRequest).toBe(false);
    });

    it('should return an empty array if the user was not found', async () => {
      const postsBy = await request(SUT)
        .get(`/api/posts/by/${post.body.data._id}`) // should be userId
        .set('Cookie', cookieSet);

      expect(postsBy.body.data.length).toBe(0);
    });
  });

  describe('GET:/api/posts/feed/', () => {
    it("should return a list of posts by the given user's following list", async () => {
      // create a post with secondUser
      await request(SUT)
        .post('/api/posts/')
        .set('Cookie', secUserCookieSet)
        .send(postPayload);

      // with user, follow secondUser
      await request(SUT)
        .put('/api/users/follow/admin_posts_test_2')
        .set('Cookie', cookieSet);

      // get user's feed
      const feed = await request(SUT)
        .get(`/api/posts/feed/`)
        .set('Cookie', cookieSet);

      const errorOnRequest = feed.body.data.some(
        ({ user }: { user: string }) => user !== secondUser.body.data._id,
      );

      expect(errorOnRequest).toBe(false);
    });
  });

  describe('DELETE:/api/posts/:postId', () => {
    it('should delete post', async () => {
      const postToDelete = await request(SUT)
        .post('/api/posts')
        .set('Cookie', cookieSet)
        .send(postPayload);

      const deletedPost = await request(SUT)
        .delete(`/api/posts/${postToDelete.body.data._id}`)
        .set('Cookie', cookieSet);

      expect(deletedPost.status).toBe(200);
      expect(deletedPost.body.data).toMatchObject(postPayload);
    });

    it('should return status 404 if no post was found with the given id', async () => {
      const deletedPost = await request(SUT)
        .delete(`/api/posts/${userId}`) // should be post id
        .set('Cookie', cookieSet);

      expect(deletedPost.status).toBe(404);
      expect(deletedPost.body).toHaveProperty('error');
    });
  });
});
