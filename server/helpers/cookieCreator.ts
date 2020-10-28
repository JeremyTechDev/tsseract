import jwt from 'jsonwebtoken';
import { iAuthenticatedUser } from '../types';

const { JWT_KEY } = process.env;

export default (user: iAuthenticatedUser) => {
  const cookie = jwt.sign(user, <string>JWT_KEY, { expiresIn: '7d' });

  const cookieExpiration = 7 * 24 * 60 * 60 * 1000; // 7 days
  const cookieExpirationDate = new Date(Date.now() + cookieExpiration);

  const cookieConfig = {
    expires: cookieExpirationDate,
    httpOnly: true,
    maxAge: cookieExpiration,
    secure: false, // FIXME: set this to !dev
    signed: true,
  };

  return { cookie, cookieConfig };
};
