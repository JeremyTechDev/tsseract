require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('📡 Connected to MongoDB...'))
  .catch((error) => console.log('Error connections to MongoDB', error.message));

app.get('/', (req, res) => res.send('Tsseract App'));

const PORT = process.env.NODE_ENV || 5000;
app.listen(PORT, () => console.log(`🚀 Running server on port ${PORT}...`));
