import express from 'express';

import {
  createUser,
  deleteUser,
  follow,
  retrieveUser,
  retrieveUserByUsername,
  unfollow,
} from '../controllers/user';
import auth from '../middlewares/authenticator';

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
router.put('/follow/:followToUsername', auth, follow);

/**
 * Unfollow a user
 * @route /api/users/unfollow/:followToUsername
 * @param {String} followToUsername the user's to unfollow username
 * @method PUT
 */
router.put('/unfollow/:followToUsername', auth, unfollow);

/**
 * Deletes a user by id
 * @route /api/users/:id
 * @method DELETE
 */
router.delete('/', auth, deleteUser);

export default router;
