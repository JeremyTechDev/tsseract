import express from 'express';

import {
  createPost,
  deletePost,
  findById,
  getPostsBy,
  getPostsFeed,
  retrieveAll,
  toggleLike,
} from '../controllers/post';
import { createComment, deleteComment } from '../controllers/comment';
import auth from '../middlewares/authenticator';

const router = express.Router();

/**
 * Creates a new post
 * @route /api/posts/
 * @method POST
 */
router.post('/', auth, createPost);

/**
 * Retrieves all posts
 * @route /api/posts/
 * @method GET
 */
router.get('/', retrieveAll);

/**
 * Retrieves a post by id
 * @route /api/posts/:postId
 * @method GET
 */
router.get('/id/:postId', findById);

/**
 * Creates a new comment in a post
 * @route /api/posts/c/:postId
 * @param {String} postId post id
 * @method POST
 */
router.post('/c/:postId', auth, createComment);

/**
 * Deletes a comment in a post
 * @route /api/posts/c/:commentId
 * @param {String} commentId comment id
 * @method DELETE
 */
router.delete('/c/:commentId', auth, deleteComment);

/**
 * Toggle the user like of a post
 * @route /api/posts/like/:postId
 * @param {String} postId post id
 * @method PUT
 */
router.put('/like/:postId', auth, toggleLike);

/**
 * Retrieves all posts by a given user
 * @route /api/posts/by/:id
 * @param {String} id user id
 * @method GET
 */
router.get('/by/:id', getPostsBy);

/**
 * Retrieves all posts that of the accounts a user follows
 * @route /api/posts/feed/:id
 * @method GET
 */
router.get('/feed/', auth, getPostsFeed);

/**
 * Deletes a post by id
 * @route /api/posts/:id/:postId
 * @param postId post id
 * @method DELETE
 */
router.delete('/:postId', auth, deletePost);

export default router;
