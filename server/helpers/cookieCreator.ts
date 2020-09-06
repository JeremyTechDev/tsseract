const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

module.exports = (userId: string) => {
  const cookie = jwt.sign({ id: userId }, JWT_KEY, { expiresIn: '7d' });

  const cookieExpiration = 604800000; // 7 days
  const cookieExpirationDate = new Date(
    Date.now() + cookieExpiration,
  ).toUTCString();

  const cookieConfig = {
    expires: cookieExpirationDate,
    httpOnly: true,
    maxAge: cookieExpiration,
    signed: true,
  };

  return { cookie, cookieConfig };
};
