import mongoose from 'mongoose';

import tester from '../../helpers/tester';

describe('Tags:Mutations', () => {
	let tagId: String;

	afterAll(async (done) => {
		await mongoose.connection.collections['tags'].drop();
		done();
	});

	describe('FindOrCreateTag', () => {
		it('should create a new tag', async () => {
			const tag = await tester({
				query: `
				mutation FindOrCreateTag($name: String!) {
					FindOrCreateTag(name: $name) { name id }
				}`,
				variables: { name: 'Test' },
			});

			// Save tag id to compare later
			tagId = tag.body.data.FindOrCreateTag.id;

			expect(tag.body).not.toHaveProperty('errors');
			expect(tag.body.data.FindOrCreateTag.name).toBe('Test');
		});

		it('should find a tag that already exists (by name)', async () => {
			const tag = await tester({
				query: `
				mutation FindOrCreateTag($name: String!) {
					FindOrCreateTag(name: $name) { name id }
				}`,
				variables: { name: 'Test' },
			});

			expect(tag.body).not.toHaveProperty('errors');
			expect(tag.body.data.FindOrCreateTag.name).toBe('Test');
			// should be the same tag as before
			expect(tag.body.data.FindOrCreateTag.id).toBe(tagId);
		});
	});
});
