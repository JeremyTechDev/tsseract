import Router from 'next/router';
import { NextPageContext } from 'next';
import { ServerResponse } from 'http';
import jwt from 'jsonwebtoken';

import { baseURL } from './config';
import requestOptions from '../helpers/requestOptions';
import { iUser, authType } from '../@types';

const WINDOW_USER_SCRIPT = '__TSS_USER__';

export const getServerSideToken = (req: any): authType => {
  const { signedCookies } = req;

  if (!signedCookies || !signedCookies['tsseract-auth-token']) {
    return { user: null, error: 'Token was not found', from: 'server' };
  }

  try {
    const decodedUser = <iUser>(
      jwt.verify(
        signedCookies['tsseract-auth-token'],
        <string>process.env.JWT_KEY,
      )
    );

    return { user: decodedUser, from: 'server' };
  } catch (error) {
    return { user: null, error, from: 'server' };
  }
};

export const getClientSideToken = (): authType => {
  if (typeof window !== 'undefined') {
    const user: iUser = window[WINDOW_USER_SCRIPT] || {};
    return { user, from: 'client' };
  }
  return { user: null, error: 'User variable was not found', from: 'client' };
};

export const getUserScript = (user: iUser | null) => {
  return `${WINDOW_USER_SCRIPT} = ${JSON.stringify(user)}`;
};

export const authInitialProps = (isPrivateRoute = false) => async ({
  req,
  res,
}: NextPageContext) => {
  const auth: authType = req
    ? await getServerSideToken(req)
    : getClientSideToken();

  if (isPrivateRoute && auth && !auth.user) {
    redirect(res, '/login');
  }

  return { user: auth };
};

type userType = { username: string; password: string };
export const loginUser = async (user: userType) => {
  try {
    const res = await fetch(baseURL + '/api/auth/login', requestOptions(user));
    const data: iUser = await res.json();

    if (typeof window !== 'undefined') {
      window[WINDOW_USER_SCRIPT] = data || {};
    }

    return { user: data };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const logoutUser = async () => {
  if (typeof window !== 'undefined') {
    window[WINDOW_USER_SCRIPT] = {};
  }

  try {
    await fetch(baseURL + '/api/auth/logout', requestOptions({}, 'POST'));
    Router.push('/login');
  } catch (error) {
    console.error(error);
  }
};

const redirect = (res: ServerResponse | undefined, path: string) => {
  if (res) {
    res.writeHead(302, { Location: path });
    res.end();
  }
  Router.replace(path);
};
