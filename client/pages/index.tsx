import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import LandingPage from '../components/LandingPage';
import { authInitialProps } from '../lib/auth';

const App: NextPage = () => {
  return (
    <Layout title="Tsseract" displayFooter={false} displayNav={false}>
      <LandingPage />
    </Layout>
  );
};

App.getInitialProps = authInitialProps();

export default App;
