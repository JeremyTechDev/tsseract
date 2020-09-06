import { RequestHandler } from 'express';

import User, { IUser } from '../models/user';

/**
 * Ensures that the user performing the action coincides with the credentials
 * @param req Express request object
 * @param res Express response object
 * @param next Next middleware function
 */
export const authorizate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.user;
    const userId = req.body.user || req.params.id;

    const user = (await User.findById(userId)) as IUser;
    if (!user)
      return res.status(404).send({ error: 'Access denied. Invalid User' });

    if (user._id.equals(token)) {
      return res.status(403).send({
        error:
          'Access denied. The current user is not allowed to perform this action.',
      });
    }

    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
