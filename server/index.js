const app = require('./app');
const { PORT = 8080 } = require('./config/env');

app().listen(PORT, () => console.log(`🚀 Server running on port ${PORT}...`));
