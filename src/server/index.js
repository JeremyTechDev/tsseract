const app = require('./app');
const { NODE_ENV } = require('../config/env');

const PORT = NODE_ENV || 5000;
app.listen(PORT, () => console.log(`🚀 Running server on port ${PORT}...`));
