import React from 'react';

import Layout from '../components/Layout';
import Posts from '../components/Posts';

const LoginPage: React.FC = () => {
  return (
    <Layout title="Tsseract App - Posts" displayNav>
      <Posts />
    </Layout>
  );
};
export default LoginPage;
