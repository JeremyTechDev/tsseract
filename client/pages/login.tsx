import React from 'react';
import { NextPage } from 'next';

import Login from '../components/Login';
import getRandomImg from '../helpers/getRandomImg';
import { iBackgroundImageData } from '../@types';

interface Props {
  bgData: iBackgroundImageData;
}

const LoginPage: NextPage<Props> = ({ bgData }) => {
  return <Login bgData={bgData} />;
};

LoginPage.getInitialProps = async () => {
  const bgData = await getRandomImg();

  return { bgData };
};

export default LoginPage;
