require('dotenv').config();

const { UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY, NODE_ENV } = process.env;

module.exports = {
  env: {
    UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY,
    ENV: NODE_ENV,
  },
};
