require('dotenv').config();
import { connect } from 'mongoose';
const { DB_NAME, NODE_ENV, MONGO_UI } = process.env;

/**
 * Starts a connection with MongoDB
 * @param {object} options starting options
 * @returns {void}
 */
const init = () => {
  const prod = NODE_ENV === 'production';
  const TARGET_DB = NODE_ENV === 'test' ? 'tsseract-db-test' : DB_NAME;

  return connect(prod ? <string>MONGO_UI : `mongodb://localhost/${TARGET_DB}`, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      if (NODE_ENV !== 'test')
        console.info(
          `📡 Connected to MongoDB (${prod ? MONGO_UI : TARGET_DB})`,
        );
    })
    .catch((error: Error) =>
      console.warn('Error connecting to MongoDB', error.message),
    );
};

export default init;
