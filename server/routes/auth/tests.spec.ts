import mongoose from 'mongoose';
import setCookie, { Cookie } from 'set-cookie-parser';

import tester from '../../helpers/tester';

describe('Auth:Mutations', () => {
	let cookieSet: [String];

	beforeAll(async (done) => {
		// Create a test user
		const testUser = await tester({
			query: `
				mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!, $birthDate: String!) {
					CreateUser(name: $name, username: $username, email: $email, password: $password, birthDate: $birthDate) { id }
				}
				`,
			variables: {
				name: 'Auth Test',
				username: 'test_auth',
				email: 'test_auth@tsseract.com',
				password: '12345678',
				birthDate: '1618011224038',
			},
		});

		// @ts-ignore
		const [cookie]: Cookie = setCookie.parse(testUser);
		cookieSet = [`${cookie.name}=${cookie.value}`];

		done();
	});

	afterAll(async (done) => {
		await mongoose.connection.collections['users'].drop();
		done();
	});

	describe('Authenticate', () => {
		it('should authenticate an existing user', async () => {
			const auth = await tester({
				query: `
				mutation Authenticate($username: String!, $password: String!) {
					Authenticate(username: $username, password: $password) { id }
				}
				`,
				variables: {
					username: 'test_auth',
					password: '12345678',
				},
			});

			// @ts-ignore
			const [cookie]: Cookie = setCookie.parse(auth);

			expect(auth.body).not.toHaveProperty('errors');
			expect(auth.body.data.Authenticate).toHaveProperty('id');
			expect(auth.header).toHaveProperty('set-cookie');
			expect(cookie.name).toBe('tsseract-auth-token');
		});

		it('should not authenticate if the given args are invalid', async () => {
			const auth = await tester({
				query: `
				mutation Authenticate($username: String!, $password: String!) {
					Authenticate(username: $username, password: $password) { id }
				}
				`,
				variables: {
					username: 'test_auth',
					password: '1234', // short password
				},
			});

			// @ts-ignore
			const [cookie]: Cookie = setCookie.parse(auth);

			expect(auth.body).toHaveProperty('errors');
			expect(cookie).toBeFalsy();
		});

		it('should not authenticate if the given user does not exist', async () => {
			const auth = await tester({
				query: `
				mutation Authenticate($username: String!, $password: String!) {
					Authenticate(username: $username, password: $password) { id }
				}
				`,
				variables: {
					username: 'test', // user does not exist
					password: '12345678',
				},
			});

			// @ts-ignore
			const [cookie]: Cookie = setCookie.parse(auth);

			expect(auth.body).toHaveProperty('errors');
			expect(cookie).toBeFalsy();
		});

		it('should not authenticate if the users password is incorrect', async () => {
			const auth = await tester({
				query: `
				mutation Authenticate($username: String!, $password: String!) {
					Authenticate(username: $username, password: $password) { id }
				}
				`,
				variables: {
					username: 'test_auth',
					password: '1234', // incorrect password
				},
			});

			// @ts-ignore
			const [cookie]: Cookie = setCookie.parse(auth);

			expect(auth.body).toHaveProperty('errors');
			expect(cookie).toBeFalsy();
		});
	});

	describe('Deauthenticate', () => {
		it('should remove the authentication token of the authencicated user', async () => {
			const deauth = await tester({
				query: `
				mutation Deauthenticate {
					Deauthenticate { id }
				}
				`,
				cookieSet,
			});

			// @ts-ignore
			const [cookie]: Cookie = setCookie.parse(deauth);

			expect(deauth.body).not.toHaveProperty('errors');
			expect(cookie.name).toBe('tsseract-auth-token');
			expect(cookie.value).toBe('');
		});

		it('should fail deauthentication if there is not authenticated user', async () => {
			const deauth = await tester({
				query: `
				mutation Deauthenticate {
					Deauthenticate { id }
				}
				`,
			});

			// @ts-ignore
			const [cookie]: Cookie = setCookie.parse(deauth);

			expect(deauth.body).toHaveProperty('errors');
			expect(cookie).toBeFalsy();
		});
	});
});
