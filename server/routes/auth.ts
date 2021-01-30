import express from 'express';

import auth from '../middlewares/authenticator';
import {
  authenticate,
  googleAuthenticate,
  deauthenticate,
  getTokenData,
} from '../controllers/auth';

const router = express.Router();

/**
 * Returns the user info within the auth token
 * @route /api/auth/
 * @method GET
 */
router.get('/', auth, getTokenData);

/**
 * Authenticates a user
 * @route /api/auth/login
 * @method POST
 */
router.post('/login/', authenticate);

/**
 * Authenticates a user with google
 * @route /api/auth/g/
 * @method POST
 */
router.post('/g/', googleAuthenticate);

/**
 * Deauthenticate a user
 * @route /api/auth/logout
 * @method POST
 */
router.post('/logout/', auth, deauthenticate);

export default router;
