import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import Avatar from '../components/Avatar';
import { authInitialProps } from '../lib/auth';

const AvatarPage: NextPage = () => {
  return (
    <Layout title="Customize Avatar">
      <Avatar />
    </Layout>
  );
};

AvatarPage.getInitialProps = authInitialProps(true);
export default AvatarPage;
