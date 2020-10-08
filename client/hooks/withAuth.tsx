import React from 'react';
import Router from 'next/router';

const loginPath = '/login';

const withAuth = (WrappedComponent: any) => {
  const AuthComponent = ({ ...props }) => <WrappedComponent {...props} />;

  AuthComponent.getInitialProps = async () => {
    const authToken = localStorage.getItem('tsseract-auth-token');

    if (authToken) {
      const response = await fetch('http://localhost:8080/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'tsseract-auth-token': authToken,
        },
      });
      const data = await response.json();

      if (!response || !data) {
        Router.replace(loginPath);
      } else if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps({
          userData: data,
        });
        return { ...wrappedProps, userData: data };
      }
    }

    return { authToken };
  };

  return AuthComponent;
};

export default withAuth;
