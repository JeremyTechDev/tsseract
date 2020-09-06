import express from 'express';
const router = express.Router();

const postControllers = require('../controllers/post');
const commentControllers = require('../controllers/comment');
const authenticate = require('../middlewares/authenticator');
const authorizate = require('../middlewares/authorization');

/**
 * Creates a new post
 * @route /api/posts/
 */
router.post('/', [authenticate, authorizate], postControllers.create);

/**
 * Creates a new comment in a post
 * @route /api/posts/c/:postId
 * @param {String} postId post id
 */
router.post(
  '/c/:postId',
  [authenticate, authorizate],
  commentControllers.create,
);

/**
 * Deletes a post by id
 * @route /api/posts/:id/:postId
 * @param id user id
 * @param postId post id
 */
router.delete(
  '/:id/:postId',
  [authenticate, authorizate],
  postControllers.deletePost,
);

module.exports = router;
