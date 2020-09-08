import express from 'express';

import {
  createPost,
  deletePost,
  getPostsBy,
  getPostsFeed,
} from '../controllers/post';
import { createComment } from '../controllers/comment';
import auth from '../middlewares/authenticator';

const router = express.Router();

/**
 * Creates a new post
 * @route /api/posts/
 * @method POST
 */
router.post('/', auth, createPost);

/**
 * Creates a new comment in a post
 * @route /api/posts/c/:postId
 * @param {String} postId post id
 * @method POST
 */
router.post('/c/:postId', auth, createComment);

/**
 * Retrieves all posts by a given user
 * @route /api/posts/by/:id
 * @param {String} id user id
 * @method GET
 */
router.get('/by/:id', auth, getPostsBy);

/**
 * Retrieves all posts that of the accounts a user follows
 * @route /api/posts/feed/:id
 * @param {String} id user id
 * @method GET
 */
router.get('/feed/:id', auth, getPostsFeed);

/**
 * Deletes a post by id
 * @route /api/posts/:id/:postId
 * @param postId post id
 * @method DELETE
 */
router.delete('/:postId', auth, deletePost);

export default router;
