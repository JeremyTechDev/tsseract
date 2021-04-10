import mongoose from 'mongoose';
import setCookie, { Cookie } from 'set-cookie-parser';

import tester from '../../helpers/tester';

describe('User:Mutations', () => {
	let cookieSet: [String];

	afterAll(async (done) => {
		await mongoose.connection.collections['users'].drop();
		done();
	});

	describe('CreateUser', () => {
		it('should create a new user', async () => {
			const user = await tester({
				query: `
				mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!, $birthDate: String!) {
					CreateUser(name: $name, username: $username, email: $email, password: $password, birthDate: $birthDate) { id }
				}
				`,
				variables: {
					name: 'Test User',
					username: 'test_user_1',
					email: 'test_user_1@tsseract.com',
					password: '12345678',
					birthDate: '1618011224038',
				},
			});

			// @ts-ignore
			const [cookie]: Cookie = setCookie.parse(user);
			cookieSet = [`${cookie.name}=${cookie.value}`];

			expect(user.body).not.toHaveProperty('errors');
			expect(user.body.data.CreateUser).toHaveProperty('id');
			expect(user.header).toHaveProperty('set-cookie');
			expect(cookie.name).toEqual('tsseract-auth-token');
		});

		it('should not create a user if the data is invalid', async () => {
			const user = await tester({
				query: `
				mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!, $birthDate: String!) {
					CreateUser(name: $name, username: $username, email: $email, password: $password, birthDate: $birthDate) { id }
				}
				`,
				variables: {
					name: 'Test User',
					username: 't', // short username
					email: 'test_user_1', // invalid email
					password: '1234', // short password
					birthDate: '1618011224038',
				},
			});

			expect(user.body).toHaveProperty('errors');
			expect(user.header).not.toHaveProperty('set-cookie');
		});

		it('should not create a user if the username or email is already taken', async () => {
			const user = await tester({
				query: `
				mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!, $birthDate: String!) {
					CreateUser(name: $name, username: $username, email: $email, password: $password, birthDate: $birthDate) { id }
				}
				`,
				variables: {
					name: 'Test User',
					username: 'test_user_1', // same username
					email: 'test_user_1@tsseract.com', // same email
					password: '12345678',
					birthDate: '1618011224038',
				},
			});

			expect(user.body).toHaveProperty('errors');
			expect(user.header).not.toHaveProperty('set-cookie');
		});
	});

	describe('UpdateUser', () => {
		it('should update the data of an existing user', async () => {
			const newName = 'New Name';
			const newEmail = 'new_email@tss.com';
			const user = await tester({
				query: `
				mutation UpdateUser($name: String!, $email: String!) {
					UpdateUser(name: $name, email: $email) { name, email }
				}
				`,
				variables: {
					name: newName,
					email: newEmail,
				},
				cookieSet,
			});

			expect(user.body.data.UpdateUser.name).toBe(newName);
			expect(user.body.data.UpdateUser.email).toBe(newEmail);
		});

		it('should not update a user if it is not authenticated', async () => {
			const user = await tester({
				query: `
				mutation UpdateUser($name: String!, $email: String!) {
					UpdateUser(name: $name, email: $email) { name, email }
				}
				`,
				variables: {
					name: 'Hey',
					email: 'test@tss.com',
				},
			});

			expect(user.body).toHaveProperty('errors');
		});

		it('should not update a user if no args were given', async () => {
			const user = await tester({
				query: `
				mutation UpdateUser($name: String!, $email: String!) {
					UpdateUser(name: $name, email: $email) { name, email }
				}
				`,
				cookieSet,
			});

			expect(user.body).toHaveProperty('errors');
		});

		it('should not update the user data if one field is invalid', async () => {
			const user = await tester({
				query: `
				mutation UpdateUser($name: String!, $email: String!) {
					UpdateUser(name: $name, email: $email) { name, email }
				}
				`,
				variables: {
					name: 'Hey',
					email: 'test', // invalid email
				},
				cookieSet,
			});

			expect(user.body).toHaveProperty('errors');
		});
	});

	describe('DeleteUser', () => {
		it('should not remove a user if it is not authenticated', async () => {
			const user = await tester({
				query: `
				mutation DeleteUser {
					DeleteUser { email }
				}
				`,
			});

			expect(user.body).toHaveProperty('errors');
		});

		it('should remove the authenticated user', async () => {
			const user = await tester({
				query: `
				mutation DeleteUser {
					DeleteUser { id }
				}
				`,
				cookieSet,
			});

			expect(user.body).not.toHaveProperty('errors');
			expect(user.body.data.DeleteUser).toHaveProperty('id');
		});
	});
});
