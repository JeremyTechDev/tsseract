require('dotenv').config();

import express from 'express';
import cookieParser from 'cookie-parser';
import { graphqlHTTP } from 'express-graphql';

import database from './database';
import graphQLSchema from './graphql';

import auth from './routes/auth/routes';
import user from './routes/users/routes';
import post from './routes/posts/routes';
import tag from './routes/tags/routes';

const { COOKIE_KEY, NODE_ENV, PORT = 8080 } = process.env;

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
  const { appHandler } = options;
  database();

  const server = express();

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
  server.use('/api/tags', tag);

  // graphql setting
  server.use(
    '/graphql',
    graphqlHTTP({
      graphiql: true,
      schema: graphQLSchema,
    }),
  );

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
