const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user');

/**
 * Creates a new user
 * @route /api/users/
 */
router.post('/', userControllers.create);

/**
 * Retrieve a user by id
 * @route /api/users/:id
 * @param {String} id user id
 */
router.get('/:id', userControllers.retrieveUser);

/**
 * Retrieve a user by username
 * @route /api/users/u/:id
 * @param {String} username user username
 */
router.get('/u/:username', userControllers.retrieveUserByUsername);

/**
 * Deletes a user by id
 * @route /api/users/:id
 * @param {String} id user id
 */
router.delete('/:id', userControllers.deleteUser);

module.exports = router;
