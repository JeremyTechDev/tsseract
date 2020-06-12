const app = require('../server/app');
const request = require('supertest');

const postControllers = require('../server/controllers/post');

describe('Posts', () => {
  describe('POST:api/posts', () => {
    const userPayload = {
      name: 'Tsseract',
      username: 'admin_posts_test',
      password: 'Admin.1234',
      email: 'admin_posts_test@tsseract.com',
      birthDate: Date.now(),
    };
    let user;

    beforeAll(async (done) => {
      user = await request(app).post('/api/users/').send(userPayload);
      done();
    });

    afterAll(async (done) => {
      const userId = user.body.data._id;
      await request(app)
        .delete(`/api/users/${userId}`)
        .set('x-auth-token', user.headers['x-auth-token']);
      done();
    });

    it('should create a new post in the database', async () => {
      const userId = user.body.data._id;
      const post = await request(app)
        .post('/api/posts')
        .set('x-auth-token', user.headers['x-auth-token'])
        .send({
          user: userId,
          title: 'Test Post',
          body: 'This is a test post',
          cover: 'No image',
        });

      //   console.log(post);
      expect(post.body.data).toMatchObject({
        user: userId,
        title: 'Test Post',
        body: 'This is a test post',
        cover: 'No image',
      });
    });
  });
});
