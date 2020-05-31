require('dotenv').config()

module.exports = {
  JWT_KEY: process.env.JWT_KEY,
  NODE_ENV: process.env.NODE_ENV,
  DB_NAME: process.env.DB_NAME,
};
