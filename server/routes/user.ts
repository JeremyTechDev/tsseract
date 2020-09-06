import express from 'express';
const router = express.Router();

const userControllers = require('../controllers/user');
const authenticate = require('../middlewares/authenticator');
const authorizate = require('../middlewares/authorization');

/**
 * Creates a new user
 * @route /api/users/
 * @method POST
 */
router.post('/', userControllers.create);

/**
 * Retrieve a user by id
 * @route /api/users/:id
 * @param {String} id user id
 * @method GET
 */
router.get('/:id', userControllers.retrieveUser);

/**
 * Retrieve a user by username
 * @route /api/users/u/:id
 * @param {String} username user username
 * @method GET
 */
router.get('/u/:username', userControllers.retrieveUserByUsername);

/**
 * Follow a user
 * @route /api/users/follow/:followToUsername
 * @param {String} followToUsername the user's to follow username
 * @method PUT
 */
router.put('/follow/:followToUsername', authenticate, userControllers.follow);

/**
 * Unfollow a user
 * @route /api/users/unfollow/:followToUsername
 * @param {String} followToUsername the user's to unfollow username
 * @method PUT
 */
router.put(
  '/unfollow/:followToUsername',
  authenticate,
  userControllers.unfollow,
);

/**
 * Deletes a user by id
 * @route /api/users/:id
 * @param {String} id user id
 * @method DELETE
 */
router.delete('/:id', [authenticate, authorizate], userControllers.deleteUser);

module.exports = router;
