const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../config/env');

/**
 * Authenticate
 */
module.exports = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token)
      return res.status(403).send({
        message: 'Access denied. No credentials provided',
        status: 'NOT_AUTHORIZED',
      });

    const decodedUser = jwt.verify(token, JWT_KEY);
    req.user = decodedUser;

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
