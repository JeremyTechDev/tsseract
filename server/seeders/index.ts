import database from '../database';
import UserModel from '../models/user';

// Dummy data from JSON
import userDummyData from './users.json';

database()
  .then(() => {
    try {
      userDummyData.forEach((dummyData) => new UserModel(dummyData).save());
    } catch (error) {
      console.error('Something went wrong running seeders');
    }
  })
  .catch(() =>
    console.error('Unable to connect to the database to run the seeders'),
  );
