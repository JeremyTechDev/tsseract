require('dotenv').config();

const withSass = require('@zeit/next-sass');

module.exports = withSass({
  env: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
  },
});
