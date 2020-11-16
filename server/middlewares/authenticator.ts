import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { iAuthenticatedUser, iUser } from '../@types';
const { JWT_KEY } = process.env;

const codes = [
  'Access denied. No credentials provided.',
  'Access denied. Corrupt credentials.',
  'Access denied. Non-existent user.',
  'Access denied. The current user is not allowed to perform this action.',
];

/**
 * Authenticate and ensures that the user performing the action coincides with the credentials
 * @param req Express request object
 * @param res Express response object
 * @param next Next middleware function
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.signedCookies['tsseract-auth-token'] ||
      req.headers['tsseract-auth-token'];

    console.log(
      'hey',
      req.signedCookies,
      req.signedCookies['tsseract-auth-token'],
    );

    if (!token) return res.status(401).send({ error: codes[0] });

    const decodedUser = <iAuthenticatedUser>jwt.verify(token, <string>JWT_KEY);

    if (!decodedUser) return res.status(403).send({ error: codes[1] });

    const { _id: userId } = decodedUser;
    const user = (await User.findById(userId)) as iUser;

    if (!user) return res.status(404).send({ error: codes[2] });

    if (!user._id.equals(userId))
      return res.status(403).send({ error: codes[3] });

    req.cookies.profile = user;
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
