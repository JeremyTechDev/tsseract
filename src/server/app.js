const express = require('express');
const mongoose = require('mongoose');
const { DB_NAME, DB_ADDRESS } = require('../config/env');

const user = require('./routes/user');
const auth = require('./routes/auth');
const post = require('./routes/post');

/**
 * Creates a Express app with a RESTful API
 * @param {Boolean} isTesting determines whether using a testing DB or not
 * @returns {app} Express application
 */
const init = (isTesting = false) => {
  const PATH = !isTesting && Boolean(DB_ADDRESS) ? DB_ADDRESS : 'localhost';
  const TARGET_DB = isTesting ? 'tsseract-db-test' : DB_NAME;

  mongoose
    .connect(`mongodb://${PATH}/${TARGET_DB}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('📡 Connected to MongoDB...'))
    .catch((error) =>
      console.log('Error connecting to MongoDB', error.message),
    );

  const app = express();
  app.use(express.json());

  app.use('/api/users', user);
  app.use('/api/posts', post);
  app.use('/api/auth', auth);

  app.get('/', (req, res) => res.send('Tsseract App'));

  return app;
};

module.exports = init;
