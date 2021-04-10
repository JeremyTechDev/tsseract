import http from 'http';
import supertest from 'supertest';

import server from '../server';

const SUT = http.createServer(server({ dev: true }));

/**
 * Returns an instance of supertest to make test requests to the GQL server
 * @param {string} query The query or mutation to make
 * @param {object} variables Optional variables for the request
 * @returns Supertest instance ready to call the GQL server
 */
const request = ({
	query,
	variables,
	cookieSet = '',
}: {
	query: String;
	variables?: object;
	cookieSet?: String | [String];
}) => {
	return supertest(SUT)
		.post('/graphql')
		.set({ 'Content-Type': 'application/json', Cookie: cookieSet })
		.send(JSON.stringify({ query, variables }));
};

export default request;
