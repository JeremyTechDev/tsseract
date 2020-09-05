require('dotenv').config();

import express, { Response } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import next from 'next';

import database from './database';
const { user, auth, post } = require('./routes');

const { NODE_ENV, PORT = 8080, PRODUCTION_URL, COOKIE_KEY } = process.env;

const dev = NODE_ENV !== 'production';
const ROOT = dev ? `http://localhost:${PORT}` : PRODUCTION_URL;

interface Options {
  isTesting?: boolean;
}

/**
 * Creates an Express app with a RESTful API
 * @param {Options} options starting options
 * @returns {app} Express application
 */
const init = (options: Options = {}) => {
  const { isTesting = false } = options;
  database({ isTesting });

  const app = next({ dev, dir: './dist/client' });
  const appHandler = app.getRequestHandler();

  app.prepare().then(() => {
    const server = express();

    // production only
    if (!dev) {
      server.use(helmet());
    }

    server.use(express.json());
    server.use(cookieParser(COOKIE_KEY));

    // give all Next.js's requests to Next.js server
    server.get('/_next/*', (req, res) => {
      appHandler(req, res);
    });
    server.get('/static/*', (req, res) => {
      appHandler(req, res);
    });

    // apply routes
    server.use('/api/users', user);
    server.use('/api/posts', post);
    server.use('/api/auth', auth);
    server.get('/', (_, res: Response) => res.send('Tsseract App'));

    // let next handle the default route
    server.get('*', (req, res) => {
      appHandler(req, res);
    });

    // start the server
    server.listen(PORT, () => console.log(`🚀 Server running on ${ROOT}`));
  });
};

export default init;
exports.app = init;
