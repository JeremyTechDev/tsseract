import express from 'express';

import { findTagLike } from './controllers';

const router = express.Router();

/**
 * Retrieves a list of tag like {query}
 * @route /api/tags/like/:query
 * @param {String} query tag like to find
 * @method GET
 */
router.get('/like/:query', findTagLike);

export default router;
