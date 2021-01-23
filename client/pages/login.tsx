import React from 'react';
import { NextPage } from 'next';

import Login from '../components/Login';
import Layout from '../components/Layout';
import getRandomImg from '../helpers/getRandomImg';
import { iBackgroundImageData } from '../@types';

interface Props {
  bgData: iBackgroundImageData;
}

const LoginPage: NextPage<Props> = ({ bgData }) => {
  return (
    <Layout title="Login to Tsseract" displayFooter={false} displayNav={false}>
      <Login bgData={bgData} />
    </Layout>
  );
};

LoginPage.getInitialProps = async () => {
  const bgData = await getRandomImg();
  return { bgData };
};

export default LoginPage;
