import React from 'react';
import Router from 'next/router';
import { Response, Request } from 'express';

import getAuthToken from '../helpers/getAuthToken';

interface iContext {
  req: Request;
  res: Response;
}

const redirect = (res: any, path: string) => {
  if (res) {
    res?.writeHead(302, { Location: path });
    res?.end();
  } else {
    Router.replace(path);
  }
};

const withAuth = (WrappedComponent: any) => {
  const AuthComponent = ({ ...props }) => <WrappedComponent {...props} />;

  AuthComponent.getInitialProps = async ({ req, res }: iContext) => {
    const authToken = getAuthToken(req);

    if (authToken) {
      //FIXME: Change route on production
      const response = await fetch('http://localhost:8080/api/auth/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'tsseract-auth-token': authToken || '',
        },
      });
      const data = await response.json();

      if (!response || !data || !data._id) {
        redirect(res, '/login');
      } else if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps({
          userData: data.user,
        });
        return { ...wrappedProps, userData: data.user };
      }

      return { user: data.user };
    } else {
      redirect(res, '/login');
    }

    return { user: null };
  };

  return AuthComponent;
};

export default withAuth;
