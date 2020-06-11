const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/post');

router.post('/', postControllers.create);

module.exports = router;
