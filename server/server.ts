require('dotenv').config();

import express from 'express';
import cookieParser from 'cookie-parser';
import { graphqlHTTP } from 'express-graphql';

import database from './database';
import graphQLSchema from './graphql';

import authMiddlware from './middlewares/authenticator';

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

	// Apply Authentication middlewares
	// server.use(authMiddlware)

	// GraphQL Server
	server.use(
		'/graphql',
		graphqlHTTP((req, res) => ({
			graphiql: NODE_ENV !== 'production',
			schema: graphQLSchema,
			context: { res, req },
		})),
	);

	// Let next handle the default route
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
