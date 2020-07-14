import app from './app';
const { PORT = 8080 } = require('./config/env');

app({ isTesting: false }).listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}...`),
);
