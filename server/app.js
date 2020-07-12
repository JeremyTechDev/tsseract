const express = require('express');
const helmet = require('helmet');
const database = require('./database');

const { user, auth, post } = require('./routes');

/**
 * Creates an Express app with a RESTful API
 * @param {Boolean} isTesting determines whether using a testing DB or not
 * @returns {app} Express application
 */
const init = (options = {}) => {
  const { isTesting } = options;
  database({ isTesting });

  const app = express();
  app.use(helmet());
  app.use(express.json());

  app.use('/api/users', user);
  app.use('/api/posts', post);
  app.use('/api/auth', auth);

  app.get('/', (req, res) => res.send('Tsseract App'));

  return app;
};

module.exports = init;
