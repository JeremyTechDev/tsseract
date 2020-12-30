require('dotenv').config();

const { UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY } = process.env;

module.exports = {
  env: {
    UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY,
  },
};
