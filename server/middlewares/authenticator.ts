import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/user';
const { JWT_KEY } = process.env;

type IDecoded = { id: string } | null;

/**
 * Authenticate and ensures that the user performing the action coincides with the credentials
 * @param req Express request object
 * @param res Express response object
 * @param next Next middleware function
 */
export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.signedCookies['tsseract-auth-token'];
    const userId = req.body.user || req.params.id; // id provided by the request

    if (!token)
      return res.status(401).send({
        error: 'Access denied. No credentials provided.',
      });

    const decodedUser = <IDecoded>jwt.verify(token, <string>JWT_KEY);

    if (!decodedUser || userId !== decodedUser.id)
      return res
        .status(403)
        .send({ error: 'Access denied. Corrupt credentials' });

    const user = (await User.findById(userId)) as IUser;

    if (!user)
      return res.status(404).send({ error: 'Access denied. Invalid User' });

    if (!user._id.equals(decodedUser.id)) {
      return res.status(403).send({
        error:
          'Access denied. The current user is not allowed to perform this action.',
      });
    }

    req.cookies.profile = user;
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
