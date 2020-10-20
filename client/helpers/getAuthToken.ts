import Cookie from 'js-cookie';
import { Request } from 'express';

const getAuthToken = (req?: Request) => {
  if (req) {
    const cookie = req.headers.cookie || '';
    const fullToken = cookie?.substring(
      cookie.lastIndexOf('') + 1,
      cookie.lastIndexOf('tsseract-auth-token='),
    );

    return fullToken.split('=')[1].split(';')[0] || '';
  } else {
    return Cookie.get('tsseract-auth-token') || '';
  }
};

export default getAuthToken;
