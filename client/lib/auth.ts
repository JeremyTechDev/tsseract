import { NextPageContext } from 'next';
import { ServerResponse } from 'http';
import jwt from 'jsonwebtoken';

import { iUser, authType } from '../@types';
import { postRequest } from '../lib/fetch';

const WINDOW_USER_SCRIPT = '__TSS_USER__';

export const getServerSideToken = (req: any): authType => {
  if (!req?.signedCookies || !req?.signedCookies['tsseract-auth-token']) {
    return { user: null, error: 'Token was not found', from: 'server' };
  }

  try {
    const decodedUser = <iUser>(
      jwt.verify(
        req.signedCookies['tsseract-auth-token'],
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
    const user: iUser = window[WINDOW_USER_SCRIPT] || null;
    return { user, from: 'client' };
  }
  return { user: null, error: 'User variable was not found', from: 'client' };
};

export const getUserScript = (user: iUser | null) => {
  return `${WINDOW_USER_SCRIPT} = ${JSON.stringify(user)}`;
};

export const authInitialProps = (isPrivateRoute = false) => ({
  req,
  res,
}: NextPageContext) => {
  const auth: authType = req ? getServerSideToken(req) : getClientSideToken();

  if (isPrivateRoute && auth && !auth.user) {
    redirect(res, '/coming-soon');
  }

  return { props: { user: auth } };
};

type userType = { username: string; password: string };
export const loginUser = async (user: userType) => {
  try {
    const res = await postRequest('/auth/login', user);
    const data: iUser & { error: string } = await res.json();

    if (data.error) {
      return { error: data.error };
    }

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
    await postRequest('/auth/logout');
    window?.location?.replace('/');
  } catch (error) {
    console.error(error);
  }
};

const redirect = (res: ServerResponse | undefined, path: string) => {
  if (res) {
    res.writeHead(302, { Location: path });
    res.end();
  }
  window?.location?.replace(path);
};
