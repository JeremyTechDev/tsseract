import database from '../database';
import UserModel from '../models/user';
import TagModel from '../models/tag';
import PostModel from '../models/post';

import postsDummyData from './posts.json';
import tagsDummyData from './tags.json';
import usersDummyData from './users.json';

database()
  .then(async () => {
    try {
      console.info('🌱 Seeding database...');
      await Promise.all(
        postsDummyData.map(
          async (dummyData) => await new PostModel(dummyData).save(),
        ),
      );
      await Promise.all(
        tagsDummyData.map(
          async (dummyData) => await new TagModel(dummyData).save(),
        ),
      );
      await Promise.all(
        usersDummyData.map(
          async (dummyData) => await new UserModel(dummyData).save(),
        ),
      );
      console.info('✅ Seeding successful...');
    } catch (error) {
      console.error('🛑 Something went wrong running seeders');
    } finally {
      process.exit(0);
    }
  })
  .catch(() => {
    console.error('🛑 Unable to connect to the database to run the seeders');
    process.exit(0);
  });
