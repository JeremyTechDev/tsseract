import React from 'react';
import Router from 'next/router';
import Cookie from 'js-cookie';
import { Response, Request } from 'express';

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
    const authToken = req
      ? req.headers.cookie && req.headers.cookie.split('=')[1]
      : Cookie.get('tsseract-auth-token');

    if (authToken) {
      //FIXME: Change route on production
      const response = await fetch('http://localhost:8080/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'tsseract-auth-token': authToken || '',
        },
      });
      const data = await response.json();

      if (!response || !data || !data.data || !data.data._id) {
        redirect(res, '/login');
      } else if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps({
          userData: data,
        });
        return { ...wrappedProps, userData: data };
      }

      return { user: data.data };
    } else {
      redirect(res, '/login');
    }

    return { user: null };
  };

  return AuthComponent;
};

export default withAuth;
