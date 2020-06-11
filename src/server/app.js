const express = require('express');
const mongoose = require('mongoose');
const { DB_NAME, DB_ADDRESS } = require('../config/env');

const user = require('./routes/user');
const auth = require('./routes/auth');

const app = express();

const PATH = Boolean(DB_ADDRESS) ? DB_ADDRESS : 'localhost';
mongoose
  .connect(`mongodb://${PATH}/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('📡 Connected to MongoDB...'))
  .catch((error) => console.log('Error connections to MongoDB', error.message));

app.use(express.json());

app.use('/api/users', user);
app.use('/api/auth', auth);

app.get('/', (req, res) => res.send('Tsseract App'));

module.exports = app;
