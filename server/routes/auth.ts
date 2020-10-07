import express from 'express';

import auth from '../middlewares/authenticator';
import {
  authenticate,
  deauthenticate,
  getTokenData,
} from '../controllers/auth';

const router = express.Router();

/**
 * Returns the user info within the auth token
 * @route /api/auth/
 * @method POST
 */
router.post('/', auth, getTokenData);

/**
 * Authenticates a user
 * @route /api/auth/login
 * @method POST
 */
router.post('/login', authenticate);

/**
 * Deauthenticate a user
 * @route /api/auth/logout
 * @method POST
 */
router.post('/logout/', auth, deauthenticate);

export default router;
