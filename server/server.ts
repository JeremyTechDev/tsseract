require('dotenv').config();

import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import database from './database';

import auth from './routes/auth';
import user from './routes/user';
import post from './routes/post';

const { COOKIE_KEY, PORT = 8080, NODE_ENV } = process.env;

interface Options {
  dev?: boolean;
  appHandler?: any;
}

/**
 * Creates an Express app with a RESTful API
 * @param {Options} options starting options
 * @returns {app} Express application
 */
const init = (options: Options) => {
  const { dev, appHandler } = options;
  database();

  const server = express();

  // production only
  if (!dev) {
    server.use(helmet());
  }

  server.use(express.json());
  server.use(cookieParser(COOKIE_KEY));

  // give all Next.js's requests to Next.js server
  if (appHandler) {
    server.get('/_next/*', (req, res) => {
      return appHandler(req, res);
    });
    server.get('/static/*', (req, res) => {
      return appHandler(req, res);
    });
  }

  // apply routes
  server.use('/api/users', user);
  server.use('/api/posts', post);
  server.use('/api/auth', auth);

  // let next handle the default route
  if (appHandler) {
    server.get('*', (req, res) => {
      return appHandler(req, res);
    });
  }

  // start the server
  if (NODE_ENV !== 'test') {
    server.listen(PORT, () =>
      console.info(`🚀 Server running on port ${PORT}...`),
    );
  }

  return server;
};

export default init;
exports.app = init;
