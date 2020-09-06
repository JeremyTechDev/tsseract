import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_KEY } = process.env;

/**
 * Authenticate
 * @param req Express request object
 * @param res Express response object
 * @param next Next middleware function
 */
module.exports = async (
  req: Request & { user: { id: string | null } },
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.signedCookies['tsseract-auth-token'];
    if (!token)
      return res.status(401).send({
        error: 'Access denied. No credentials provided.',
      });

    const decodedUser = jwt.verify(token, <string>JWT_KEY);
    req.user = decodedUser as { id: string | null };

    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
