import express from 'express';

import { findTagLike } from './controllers';

const router = express.Router();

/**
 * Retrieve a list of tags with the last post with that tag
 * @route /api/tags
 * @method GET
 */
// router.get('/', getTags);

/**
 * Retrieves a list of tag like {query}
 * @route /api/tags/like/:query
 * @param {String} query tag like to find
 * @method GET
 */
router.get('/like/:query', findTagLike);

export default router;
