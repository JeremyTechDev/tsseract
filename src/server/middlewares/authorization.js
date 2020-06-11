const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

/**
 * Ensures that the user performing the action coincides with the credentials
 * @param req Express request object
 * @param res Express response object
 * @param next Next middleware function
 */
exports.userAuth = (req, res, next) => {
  try {
    const token = req.user;
    console.log(token);
    if (token.id !== req.body.user) {
      return res.status(403).send({
        message:
          'Access denied. The current user is not allow to perform that action',
      });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
