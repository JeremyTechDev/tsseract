import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import LandingPage from '../components/LandingPage';
import { authInitialProps } from '../lib/auth';
import { authType } from '../@types';

interface Props {
  user: authType;
}

const App: NextPage<Props> = ({ user }) => {
  return (
    <Layout title="Tsseract" authData={user}>
      <LandingPage />
    </Layout>
  );
};

App.getInitialProps = authInitialProps();

export default App;
