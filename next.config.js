require('dotenv').config();

const withSass = require('@zeit/next-sass');

const { UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY, NODE_ENV } = process.env;

module.exports = withSass({
  env: {
    UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY,
    ENV: NODE_ENV,
  },
});
