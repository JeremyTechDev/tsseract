import express from 'express';

import {
  createUser,
  deleteUser,
  follow,
  retrieveUser,
  retrieveUserByUsername,
  unfollow,
} from '../controllers/user';
import { authenticate } from '../middlewares/authenticator';
import { authorizate } from '../middlewares/authorization';

const router = express.Router();

/**
 * Creates a new user
 * @route /api/users/
 * @method POST
 */
router.post('/', createUser);

/**
 * Retrieve a user by id
 * @route /api/users/:id
 * @param {String} id user id
 * @method GET
 */
router.get('/:id', retrieveUser);

/**
 * Retrieve a user by username
 * @route /api/users/u/:id
 * @param {String} username user username
 * @method GET
 */
router.get('/u/:username', retrieveUserByUsername);

/**
 * Follow a user
 * @route /api/users/follow/:followToUsername
 * @param {String} followToUsername the user's to follow username
 * @method PUT
 */
router.put('/follow/:followToUsername', authenticate, follow);

/**
 * Unfollow a user
 * @route /api/users/unfollow/:followToUsername
 * @param {String} followToUsername the user's to unfollow username
 * @method PUT
 */
router.put('/unfollow/:followToUsername', authenticate, unfollow);

/**
 * Deletes a user by id
 * @route /api/users/:id
 * @param {String} id user id
 * @method DELETE
 */
router.delete('/:id', [authenticate, authorizate], deleteUser);

export default router;
