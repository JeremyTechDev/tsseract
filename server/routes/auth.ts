import express from 'express';

import { auth } from '../controllers/auth';

const router = express.Router();

/**
 * Creates a new user
 * @route /api/auth/
 * @method POST
 */
router.post('/', auth);

export default router;
