import faker from 'faker';
import database from './database';
import UserModel from './models/user';
import TagModel from './models/tag';
import PostModel from './models/post';

const userIds: string[] = [];

database()
  .then(async () => {
    console.info('🌱 Seeding database...');

    try {
      // create 20 users
      for (let userIndex = 0; userIndex < 20; userIndex++) {
        await new UserModel({
          name: faker.name.firstName(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(8),
          birthDate: faker.date.past(),
          following: userIds.length
            ? [userIds[faker.random.number(userIds.length - 1)]]
            : [],
          followers: userIds.length
            ? [userIds[faker.random.number(userIds.length - 1)]]
            : [],
        })
          .save()
          .then(async ({ _id: currUserId }) => {
            console.info(`👤 User: ${currUserId}`);
            userIds.push(currUserId); // add it after saving user to avoid self-follow
            // 10 posts per user
            for (let postIndex = 0; postIndex < 10; postIndex++) {
              await new PostModel({
                user: currUserId,
                body: faker.fake(
                  '[{"type":"align-left","children":[{"text":"{{lorem.paragraphs}}"}]}]',
                ),
                tags: [],
                title: faker.lorem.sentence(),
                cover: faker.random.image(),
                comments: [
                  {
                    user: userIds[faker.random.number(userIds.length - 1)],
                    body: faker.lorem.paragraph(),
                  },
                ],
              })
                .save()
                .then(({ _id }) => console.info(`\t🌎 Post: ${_id}`));
            }
          });
      }
      console.info('✅ Seeding successful...');
    } catch (error) {
      console.error('🛑 Something went wrong running seeders', error);
    } finally {
      process.exit(0);
    }
  })
  .catch(() => {
    console.error('🛑 Unable to connect to the database to run the seeders');
    process.exit(0);
  });
