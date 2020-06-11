const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/post');
const authenticate = require('../middlewares/authenticator');
const { userAuth } = require('../middlewares/authorization');

/**
 * Creates a new post
 * @route /api/posts/
 */
router.post('/', [authenticate, userAuth], postControllers.create);

module.exports = router;
