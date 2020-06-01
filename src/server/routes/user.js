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
 */
router.get('/:id', userControllers.retrieveUser);

module.exports = router;
