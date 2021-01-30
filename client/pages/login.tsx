import React from 'react';
import { NextPage } from 'next';

import Login from '../components/Login';
import Layout from '../components/Layout';
import getRandomImg from '../helpers/getRandomImg';
import { iBackgroundImageData } from '../@types';

interface Props {
  bgData: iBackgroundImageData;
  clientId: string;
}

const LoginPage: NextPage<Props> = ({ bgData, clientId }) => {
  return (
    <Layout title="Login to Tsseract" displayFooter={false} displayNav={false}>
      <Login bgData={bgData} clientId={clientId} />
    </Layout>
  );
};

LoginPage.getInitialProps = async () => {
  const bgData = await getRandomImg();
  return { bgData, clientId: process.env.GOOGLE_CLIENT_ID as string };
};

export default LoginPage;
