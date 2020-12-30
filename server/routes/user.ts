import express from 'express';

import {
  createUser,
  deleteUser,
  retrieveUser,
  retrieveUserByUsername,
  toggleFollow,
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
 * Toggles the follow state of two related users
 * @route /api/users/toggle-follow/:followToUsername
 * @param {String} followToUsername the user's to follow username
 * @method PUT
 */
router.put('/toggle-follow/:followToUsername', auth, toggleFollow);

/**
 * Deletes the authenticated user
 * @route /api/users/
 * @method DELETE
 */
router.delete('/', auth, deleteUser);

export default router;
