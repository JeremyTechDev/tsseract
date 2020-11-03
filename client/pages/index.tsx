import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import Posts from '../components/Posts';

const App: NextPage<{}> = () => {
  return (
    <Layout title="Tsseract App" displayNav>
      <Posts />
    </Layout>
  );
};

export default App;
