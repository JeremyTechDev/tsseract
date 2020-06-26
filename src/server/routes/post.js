const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/Post/post');
const commentControllers = require('../controllers/Post/comment');
const authenticate = require('../middlewares/authenticator');
const { userAuth } = require('../middlewares/authorization');

/**
 * Creates a new post
 * @route /api/posts/
 */
router.post('/', [authenticate, userAuth], postControllers.create);

/**
 * Creates a new comment in a post
 * @route /api/posts/c
 * @param {String} postId post id
 */
router.post('/c/:postId', [authenticate, userAuth], commentControllers.create);

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
