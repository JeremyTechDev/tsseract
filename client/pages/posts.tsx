import React from 'react';

import Layout from '../components/Layout';
import Posts from '../components/PostsList';

const LoginPage: React.FC = () => {
  return (
    <Layout title="Tsseract App - Posts" displayNav>
      <Posts />
    </Layout>
  );
};
export default LoginPage;
