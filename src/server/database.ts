import { connect } from 'mongoose';
const { DB_NAME, DB_ADDRESS } = require('./config/env');

/**
 * Starts a connection with MongoDB
 * @param {object} options starting options
 * @returns {void}
 */
const init = (options: { isTesting: boolean }) => {
  const { isTesting } = options;
  const PATH = !isTesting && Boolean(DB_ADDRESS) ? DB_ADDRESS : 'localhost';
  const TARGET_DB = isTesting ? 'tsseract-db-test' : DB_NAME;

  connect(`mongodb://${PATH}/${TARGET_DB}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('📡 Connected to MongoDB...'))
    .catch((error: Error) =>
      console.log('Error connecting to MongoDB', error.message),
    );
};

export default init;
