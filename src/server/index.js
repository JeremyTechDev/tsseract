const app = require('./app');
const { NODE_ENV = 8080 } = require('../config/env');

app().listen(NODE_ENV, () =>
  console.log(`🚀 Running server on port ${NODE_ENV}...`),
);
