import express from 'express';
const router = express.Router();

const authControllers = require('../controllers/auth');

/**
 * Creates a new user
 * @route /api/auth/
 */
router.post('/', authControllers.auth);

module.exports = router;
