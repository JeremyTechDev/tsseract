import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_KEY } = process.env;

/**
 * Authenticate
 * @param req Express request object
 * @param res Express response object
 * @param next Next middleware function
 */
export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.signedCookies['tsseract-auth-token'];
    if (!token)
      return res.status(401).send({
        error: 'Access denied. No credentials provided.',
      });

    const decodedUser = jwt.verify(token, <string>JWT_KEY);
    req.cookies.user = decodedUser;

    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
