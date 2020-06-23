/**
 * Ensures that the user performing the action coincides with the credentials
 * @param req Express request object
 * @param res Express response object
 * @param next Next middleware function
 */
exports.userAuth = (req, res, next) => {
  try {
    const token = req.user;
    const userId = req.body.user ? req.body.user : req.params.id;

    if (token.id !== userId) {
      return res.status(403).send({
        message:
          'Access denied. The current user is not allowed to perform this action.',
      });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
