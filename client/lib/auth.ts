import Router from 'next/router';
import cookie from 'js-cookie';
import { NextPageContext } from 'next';
import { ServerResponse, IncomingMessage } from 'http';

import { baseURL } from './config';
import requestOptions from '../helpers/requestOptions';

export const getServerSideToken = (req: IncomingMessage) => {
  const cookies = req.headers.cookie || '';
  const isTokenSet = cookies.indexOf('tsseract-auth-token');

  if (isTokenSet !== -1) {
    const fullToken = cookies?.substring(
      cookies.lastIndexOf('') + 1,
      cookies.lastIndexOf('tsseract-auth-token='),
    );

    return fullToken.split('=')[1].split(';')[0] || null;
  }
  return null;
};

export const getClientSideToken = () => {
  const cookieData = cookie.get('tsseract-auth-token');
  return cookieData ? JSON.parse(cookieData) : null;
};

export const authInitialProps = (isPrivateRoute: boolean) => ({
  req,
  res,
}: NextPageContext) => {
  const authToken = req ? getServerSideToken(req) : getClientSideToken();
  const currentPath = req ? req.url : window.location.pathname;
  if (isPrivateRoute && !authToken && currentPath !== '/login') {
    return redirectUser(res, '/login');
  }

  return { authToken };
};

const redirectUser = (res: ServerResponse | undefined, path: string) => {
  if (res) {
    res.writeHead(302, { Location: path });
    res.end();
    return {};
  }
  Router.replace(path);
  return {};
};

export const loginUser = async (user: {
  username: string;
  password: string;
}) => {
  try {
    const res = await fetch(baseURL + '/api/auth/login', requestOptions(user));
    const data = await res.json();

    if (!data.error) {
      cookie.set('tsseract-auth-token', data || null);
    }

    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const logoutUser = async () => {
  try {
    cookie.remove('tsseract-auth-token');
    await fetch(baseURL + '/api/auth/logout', requestOptions({}, 'POST'));
    Router.push('/login');
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getUserProfile = async () => {
  try {
    const res = await fetch(baseURL + '/api/auth/');
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
