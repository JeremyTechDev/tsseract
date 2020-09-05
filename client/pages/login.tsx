import React from 'react';

import Layout from '../components/Layout';
import Login from '../components/Login';

const LoginPage: React.FC = () => {
  return (
    <Layout title="Tsseract App">
      <Login />
    </Layout>
  );
};
export default LoginPage;
