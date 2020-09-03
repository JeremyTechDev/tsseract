require('dotenv').config();

module.exports = {
  COOKIE_KEY: process.env.COOKIE_KEY,
  DB_ADDRESS: process.env.DB_ADDRESS,
  DB_NAME: process.env.DB_NAME,
  JWT_KEY: process.env.JWT_KEY,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
