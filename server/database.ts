require('dotenv').config();
import { connect } from 'mongoose';

/**
 * Starts a connection with MongoDB
 * @param {object} options starting options
 * @returns {void}
 */
const init = () => {
	const prod = process.env.NODE_ENV === 'production';
	const TARGET_DB =
		process.env.NODE_ENV === 'test' ? 'tsseract-db-test' : process.env.DB_NAME;

	return connect(
		prod ? <string>process.env.MONGO_UI : `mongodb://localhost/${TARGET_DB}`,
		{
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	)
		.then(() => {
			if (process.env.NODE_ENV !== 'test')
				console.info(
					`📡 Connected to MongoDB (${
						prod ? process.env.MONGO_UI : TARGET_DB
					})`,
				);
		})
		.catch((error: Error) =>
			console.warn('Error connecting to MongoDB', error.message),
		);
};

export default init;
