const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/post');

/**
 * Creates a new post
 * @route /api/posts/
 */
router.post('/', postControllers.create);

module.exports = router;
