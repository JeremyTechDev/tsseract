import express from 'express';

import auth from '../middlewares/authenticator';
import { authenticate, deauthenticate } from '../controllers/auth';

const router = express.Router();

/**
 * Authenticates a user
 * @route /api/auth/
 * @method POST
 */
router.post('/', authenticate);

/**
 * Deauthenticate a user
 * @route /api/auth/
 * @method POST
 */
router.post('/logout/', auth, deauthenticate);

export default router;
