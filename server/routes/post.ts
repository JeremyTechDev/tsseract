import express from 'express';

import { createPost, deletePost } from '../controllers/post';
import { createComment } from '../controllers/comment';
import { authenticate } from '../middlewares/authenticator';
import { authorizate } from '../middlewares/authorization';

const router = express.Router();

/**
 * Creates a new post
 * @route /api/posts/
 * @method POST
 */
router.post('/', [authenticate, authorizate], createPost);

/**
 * Creates a new comment in a post
 * @route /api/posts/c/:postId
 * @param {String} postId post id
 * @method POST
 */
router.post('/c/:postId', [authenticate, authorizate], createComment);

/**
 * Deletes a post by id
 * @route /api/posts/:id/:postId
 * @param id user id
 * @param postId post id
 * @method DELETE
 */
router.delete('/:id/:postId', [authenticate, authorizate], deletePost);

export default router;
