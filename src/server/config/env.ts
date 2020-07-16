require('dotenv').config();

module.exports = {
  DB_ADDRESS: process.env.DB_ADDRESS,
  DB_NAME: process.env.DB_NAME,
  JWT_KEY: process.env.JWT_KEY,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
