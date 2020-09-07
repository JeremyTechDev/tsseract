import jwt from 'jsonwebtoken';

const { JWT_KEY } = process.env;

export default (userId: string) => {
  const cookie = jwt.sign({ id: userId }, <string>JWT_KEY, { expiresIn: '7d' });

  const cookieExpiration = 7 * 24 * 60 * 60 * 1000; // 7 days
  const cookieExpirationDate = new Date(Date.now() + cookieExpiration);

  const cookieConfig = {
    expires: cookieExpirationDate,
    httpOnly: true,
    maxAge: cookieExpiration,
    signed: true,
  };

  return { cookie, cookieConfig };
};
