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

/**
 * Deletes a post by id
 * @route /api/posts/:id/:postId
 * @param id user id
 * @param postId post id
 */
router.delete(
  '/:id/:postId',
  [authenticate, userAuth],
  postControllers.deletePost,
);

module.exports = router;
