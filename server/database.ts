import { connect } from 'mongoose';
const { DB_NAME, DB_ADDRESS, NODE_ENV } = process.env;

/**
 * Starts a connection with MongoDB
 * @param {object} options starting options
 * @returns {void}
 */
const init = () => {
  const PATH = NODE_ENV === 'production' ? DB_ADDRESS : 'localhost';
  const TARGET_DB = NODE_ENV === 'test' ? 'tsseract-db-test' : DB_NAME;

  connect(`mongodb://${PATH}/${TARGET_DB}`, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.info(`📡 Connected to MongoDB (${TARGET_DB})`))
    .catch((error: Error) =>
      console.warn('Error connecting to MongoDB', error.message),
    );
};

export default init;
