require('dotenv').config();

const {
  UNSPLASH_ACCESS_KEY,
  UNSPLASH_SECRET_KEY,
  NODE_ENV,
  PRODUCTION_URL,
} = process.env;

module.exports = {
  env: {
    UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY,
    PRODUCTION_URL,
    ENV: NODE_ENV,
  },
};
