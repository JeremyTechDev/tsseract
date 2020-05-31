const express = require('express');
const mongoose = require('mongoose');
const { DB_NAME, NODE_ENV } = require('../config/env');

const user = require('./routes/user');

const app = express();

mongoose
  .connect(`mongodb://localhost/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('📡 Connected to MongoDB...'))
  .catch((error) => console.log('Error connections to MongoDB', error.message));

app.use(express.json());
app.get('/', (req, res) => res.send('Tsseract App'));
app.use('/api/users', user);

const PORT = NODE_ENV || 5000;
app.listen(PORT, () => console.log(`🚀 Running server on port ${PORT}...`));
