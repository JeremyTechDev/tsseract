import React from 'react';
import { GoogleLogin } from 'react-google-login';

import { refreshToken } from '../../helpers/refreshToken';

interface Props {
  clientId: string;
  className: string;
  text: string;
}

export const Login = ({ clientId, className, text }: Props) => {
  const onSuccess = (res: any) => {
    console.debug('Current user', res.profileObj);
    refreshToken(res);
  };

  const onFailure = (res: any) => {
    console.debug('Failure', res);
  };

  return (
    <GoogleLogin
      buttonText={text}
      className={className}
      clientId={clientId}
      cookiePolicy="single_host_origin"
      isSignedIn
      onFailure={onFailure}
      onSuccess={onSuccess}
      theme="dark"
    />
  );
};

// export const Logout = () => {
//   const onSuccess = () => {
//     console.debug('Logged out');
//   };

//   return (
//     <GoogleLogout
//       clientId={GOOGLE_CLIENT_ID as string}
//       buttonText="Logout"
//       onLogoutSuccess={onSuccess}
//     />
//   );
// };
