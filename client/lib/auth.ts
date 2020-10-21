import axios from 'axios';
import Router from 'next/router';
import { NextPageContext } from 'next';
import { ServerResponse, IncomingMessage } from 'http';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080';
const WINDOW_USER_SCRIPT_VARIABLE = '__TSSERACT_AUTH_TOKEN__';

export const getServerSideToken = (req: IncomingMessage) => {
  const cookies = req.headers.cookie || '';
  const isTokenSet = cookies.indexOf('tsseract-auth-token');

  if (isTokenSet !== -1) {
    const fullToken = cookies?.substring(
      cookies.lastIndexOf('') + 1,
      cookies.lastIndexOf('tsseract-auth-token='),
    );

    return fullToken.split('=')[1].split(';')[0] || {};
  }
  return null;
};

export const getClientSideToken = () => {
  if (typeof window !== 'undefined') {
    const authToken = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
    return authToken;
  }
  return {};
};

export const getUserScript = (user: {}) => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)};`;
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
    const { data } = await axios.post('/api/auth/login', user);
    if (typeof window !== 'undefined') {
      window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
    }
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const logoutUser = async () => {
  try {
    if (typeof window !== 'undefined') {
      window[WINDOW_USER_SCRIPT_VARIABLE] = {};
    }
    await axios.post('/api/auth/logout');
    Router.push('/login');
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await axios.get('/api/auth/');
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
