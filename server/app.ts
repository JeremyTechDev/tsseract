import express, { Request, Response } from 'express';
import helmet from 'helmet';
import database from './database';
const { user, auth, post } = require('./routes');

interface Options {
  isTesting: boolean;
}

/**
 * Creates an Express app with a RESTful API
 * @param {Options} options starting options
 * @returns {app} Express application
 */
const init = (options: Options) => {
  const { isTesting } = options;
  database({ isTesting });

  const app = express();
  app.use(helmet());
  app.use(express.json());

  app.use('/api/users', user);
  app.use('/api/posts', post);
  app.use('/api/auth', auth);

  app.get('/', (_: Request, res: Response) => res.send('Tsseract App'));

  return app;
};

export default init;
