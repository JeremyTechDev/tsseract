import http from 'http';
import request from 'supertest';
import setCookie from 'set-cookie-parser';

import server from '../server';

describe('Tag', () => {
  const SUT = http.createServer(server({ dev: true }));
  const userPayload = {
    name: 'Tsseract',
    username: 'admin_tags_test',
    password: 'Admin.1234',
    email: 'admin_tags_test@tsseract.com',
    birthDate: Date.now(),
  };
  const postPayload = {
    title: 'Title',
    body: 'Body',
    tags: ['TypeScript', 'Python'],
  };

  let user: any, post: any, cookieSet: [string];

  beforeAll(async (done) => {
    user = await request(SUT).post('/api/users/').send(userPayload);
    const cookie = setCookie.parse(user)[0];
    cookieSet = [`${cookie.name}=${cookie.value}`];

    post = await request(SUT)
      .post('/api/posts')
      .set('Cookie', cookieSet)
      .send(postPayload);

    SUT.listen(done);
  });

  afterAll(async (done) => {
    await request(SUT).delete(`/api/users/`).set('Cookie', cookieSet);

    SUT.close(done);
  });

  describe('GET:/api/tags/like/:query', () => {
    it('should return a tag by its name', async () => {
      const tags = await request(SUT).get('/api/tags/like/typescript');

      expect(tags.body.length).toBe(1);
      expect(tags.body[0]).toBe('TypeScript');
    });

    it('should return all tags that match a given text', async () => {
      const tags = await request(SUT).get('/api/tags/like/p');

      expect(tags.body.length).toBe(2);
      expect(tags.body).toContain('Python');
      expect(tags.body).toContain('TypeScript');
    });

    it('should return an empty array if the query does not match any tag', async () => {
      const tags = await request(SUT).get('/api/tags/like/hi');

      expect(tags.body.length).toBe(0);
    });
  });

  describe('GET:/api/tags', () => {
    it('should return a list of tags with one post, sorted by popularity', async () => {
      const tags = await request(SUT).get('/api/tags');

      let lastPopularity = Number.MAX_SAFE_INTEGER;
      tags.body.forEach((tag: any) => {
        expect(lastPopularity).toBeGreaterThanOrEqual(tag.tag.popularity);
        expect(tag.post.tags).toContain(tag.tag._id);
        expect(tag.tag).toHaveProperty('name');

        lastPopularity = tag.tag.popularity;
      });
    });
  });
});
