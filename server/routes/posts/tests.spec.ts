import mongoose from 'mongoose';
import setCookie, { Cookie } from 'set-cookie-parser';

import tester from '../../helpers/tester';

describe('Post:Mutations', () => {
	let postId: String, cookieSet: [String];

	beforeAll(async (done) => {
		// Create a test user
		const testUser = await tester({
			query: `
				mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!, $birthDate: String!) {
					CreateUser(name: $name, username: $username, email: $email, password: $password, birthDate: $birthDate) { id }
				}
				`,
			variables: {
				name: 'Posts Test',
				username: 'test_posts',
				email: 'test_posts@tsseract.com',
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
		await mongoose.connection.collections['posts'].drop();
		done();
	});

	describe('CreatePost', () => {
		it('should create a new post', async () => {
			const post = await tester({
				query: `
				mutation CreatePost($title: String!, $body: String!, $cover: String, $tags: [String]) {
					CreatePost(title: $title, body: $body, cover: $cover, tags: $tags) { id }
				}
				`,
				variables: {
					body: 'some body',
					cover: 'some-url',
					tags: ['tag1', 'tag2'],
					title: 'Title',
				},
				cookieSet,
			});

			// save post id for later
			postId = post.body.data.CreatePost.id;

			expect(post.body).not.toHaveProperty('errors');
			expect(post.body.data.CreatePost).toHaveProperty('id');
		});

		it('should not create the post id the user is not authenticated', async () => {
			const post = await tester({
				query: `
				mutation CreatePost($title: String!, $body: String!, $cover: String, $tags: [String]) {
					CreatePost(title: $title, body: $body, cover: $cover, tags: $tags) { id }
				}
				`,
				variables: {
					body: 'some body',
					cover: 'some-url',
					tags: ['tag1', 'tag2'],
					title: 'Title',
				},
			});

			expect(post.body).toHaveProperty('errors');
		});

		it('should not create the post if one of the fields is invalid', async () => {
			const post = await tester({
				query: `
				mutation CreatePost($title: String!, $body: String!, $cover: String, $tags: [String]) {
					CreatePost(title: $title, body: $body, cover: $cover, tags: $tags) { id }
				}
				`,
				variables: {
					body: 'some body',
					cover: 'some-url',
					tags: ['tag1', 'tag2'],
					title: '', // required
				},
				cookieSet,
			});

			expect(post.body).toHaveProperty('errors');
		});
	});

	describe('ToggleLike', () => {
		it('should add a like to a post', async () => {
			const like = await tester({
				query: `
				mutation ToggleLike($postId: String!) {
					ToggleLike(postId: $postId) { id likes { id } }
				}
				`,
				variables: { postId },
				cookieSet,
			});

			expect(like.body).not.toHaveProperty('errors');
			expect(like.body.data.ToggleLike.likes.length).toBe(1);
		});

		it('should remove the like from the previous post', async () => {
			const like = await tester({
				query: `
				mutation ToggleLike($postId: String!) {
					ToggleLike(postId: $postId) { id likes { id } }
				}
				`,
				variables: { postId },
				cookieSet,
			});

			expect(like.body).not.toHaveProperty('errors');
			expect(like.body.data.ToggleLike.likes.length).toBe(0);
		});

		it('should not toggle the like if no user is authenticated', async () => {
			const like = await tester({
				query: `
				mutation ToggleLike($postId: String!) {
					ToggleLike(postId: $postId) { id likes { id } }
				}
				`,
				variables: { postId },
			});

			expect(like.body).toHaveProperty('errors');
		});

		it('should not toggle the like if no post with the given id is found', async () => {
			const like = await tester({
				query: `
				mutation ToggleLike($postId: String!) {
					ToggleLike(postId: $postId) { id likes { id } }
				}
				`,
				variables: { postId: 'no-post-with-this-id' },
				cookieSet,
			});

			expect(like.body).toHaveProperty('errors');
		});
	});

	describe('DeletePost', () => {
		it('should not delete the post if no user is authenticated', async () => {
			const del = await tester({
				query: `
				mutation DeletePost($postId: String!) {
					DeletePost(postId: $postId) { id }
				}
				`,
				variables: { postId },
			});

			expect(del.body).toHaveProperty('errors');
		});

		it('should not delete the post if no post with the given id is found', async () => {
			const del = await tester({
				query: `
				mutation DeletePost($postId: String!) {
					DeletePost(postId: $postId) { id }
				}
				`,
				variables: { postId: 'no-post-with-this-id' },
				cookieSet,
			});

			expect(del.body).toHaveProperty('errors');
		});

		it('should not delete the post if it does not belong to the user', async () => {
			// Create a test user
			const testUser = await tester({
				query: `
				mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!, $birthDate: String!) {
					CreateUser(name: $name, username: $username, email: $email, password: $password, birthDate: $birthDate) { id }
				}
				`,
				variables: {
					name: 'Posts Test',
					username: 'test_posts_2',
					email: 'test_posts_2@tsseract.com',
					password: '12345678',
					birthDate: '1618011224038',
				},
			});

			// @ts-ignore
			const [cookie]: Cookie = setCookie.parse(testUser);
			const cookieSet: [String] = [`${cookie.name}=${cookie.value}`];

			const del = await tester({
				query: `
				mutation DeletePost($postId: String!) {
					DeletePost(postId: $postId) { id }
				}
				`,
				variables: { postId },
				cookieSet,
			});

			expect(del.body).toHaveProperty('errors');
		});

		it('should delete a post', async () => {
			const del = await tester({
				query: `
				mutation DeletePost($postId: String!) {
					DeletePost(postId: $postId) { id }
				}
				`,
				variables: { postId },
				cookieSet,
			});

			expect(del.body).not.toHaveProperty('errors');
		});
	});
});
