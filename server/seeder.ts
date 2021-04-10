import faker from 'faker';
import bcrypt from 'bcrypt';
import database from './database';
import UserModel from './routes/users/model';
import TagModel from './routes/tags/model';
import PostModel from './routes/posts/model';

const userIds: string[] = [];
const tagIds: string[] = [];

database()
	.then(async () => {
		console.info('🌱 Seeding database...\n');

		try {
			// Seed 10 tags
			for (let i = 0; i < 10; i++) {
				await new TagModel(fakeTag())
					.save()
					.then(({ _id }) => tagIds.push(_id));
			}
			console.info('🏷️ Created 10 tags');

			// Seed 10 users
			for (let i = 0; i < 10; i++) {
				await new UserModel(fakeUser())
					.save()
					.then(async ({ _id: currUserId }) => {
						userIds.push(currUserId); // add it after saving user to avoid self-follow
						console.info(`👤 User: ${currUserId}`);

						// Seed 5 posts per user
						for (let postIndex = 0; postIndex < 5; postIndex++) {
							await new PostModel(fakePost(currUserId)).save();
						}
					})
					.then(() => console.info(`\t🌎 Created 5 posts for this user`));
			}

			// Create test user
			const testUser = fakeUser();
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash('12345678', salt);

			Object.assign(testUser, {
				email: 'test.user@tsseract.com',
				name: 'Test User',
				password: hashedPassword,
				username: 'test',
			});

			await new UserModel(testUser).save();

			console.info('\n✅ Seeding successful...');
		} catch (error) {
			console.error('🛑 Something went wrong running seeders', error);
		} finally {
			process.exit(0);
		}
	})
	.catch(() => {
		console.error('🛑 Unable to connect to the database to run the seeders');
		process.exit(0);
	});

const fakeTag = () => ({
	name: faker.random.word(),
	popularity: faker.random.number(100),
});

const fakeUser = () => ({
	name: faker.name.findName(),
	email: faker.internet.email(),
	username: faker.internet.userName(),
	password: faker.internet.password(8),
	birthDate: faker.date.past(),
	following: userIds.length
		? [userIds[faker.random.number(userIds.length - 1)]]
		: [],
	followers: userIds.length
		? [userIds[faker.random.number(userIds.length - 1)]]
		: [],
});

const fakePost = (user: string) => ({
	user,
	likes: userIds,
	body: faker.fake(
		'[{"type":"align-left","children":[{"text":"{{lorem.sentence}}"}]}]',
	),
	title: faker.lorem.words(7),
	cover: faker.random.image(),
	comments: [
		{
			user: userIds[faker.random.number(userIds.length - 1)],
			body: faker.lorem.paragraph(),
		},
	],
	tags: [tagIds[faker.random.number(tagIds.length - 1)]],
});
