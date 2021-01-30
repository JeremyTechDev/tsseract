import React, { useContext } from 'react';
import Router from 'next/router';
import { GoogleLogin } from 'react-google-login';

import AppContext, { Types } from '../../context';
import { refreshToken } from '../../helpers/refreshToken';
import { postRequest } from '../../lib/fetch';
import { loginUserGoogle } from '../../lib/auth';

interface Props {
  clientId: string;
}

const Login = ({ clientId }: Props) => {
  const { dispatch } = useContext(AppContext);

  const onSuccess = (res: any) => {
    postRequest('/auth/g/', {
      name: res.profileObj.name,
      email: res.profileObj.email,
      googleId: res.profileObj.googleId,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          dispatch({
            type: Types.SET_CREDENTIALS,
            payload: data,
          });
          loginUserGoogle(data);
          Router.push('/posts');
        }
      })
      .catch((error) => console.error(error.message));
    refreshToken(res);
  };

  const onFailure = (res: any) => {
    console.error('Error signing in with Google Auth', res);
    alert('An error ocurred trying to login in');
  };

  return (
    <GoogleLogin
      clientId={clientId}
      cookiePolicy="single_host_origin"
      isSignedIn
      onFailure={onFailure}
      onSuccess={onSuccess}
    />
  );
};

export default Login;
