import express from 'express';

import {
  createUser,
  deleteUser,
  retrieveUser,
  retrieveUserByGoogleId,
  toggleFollow,
  updateUser,
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
 * Updates the given attributes of a user
 * @route /api/users
 * @method put
 */
router.put('/', auth, updateUser);

/**
 * Retrieve a user by google id
 * @route /api/users/u/:googleId
 * @param {String} googleId user googleId
 * @method GET
 */
router.get('/u/:googleId', retrieveUserByGoogleId);

/**
 * Toggles the follow state of two related users
 * @route /api/users/toggle-follow/:followToId
 * @param {String} followToId the user's to follow username
 * @method PUT
 */
router.put('/toggle-follow/:followToId', auth, toggleFollow);

/**
 * Deletes the authenticated user
 * @route /api/users/
 * @method DELETE
 */
router.delete('/', auth, deleteUser);

export default router;
