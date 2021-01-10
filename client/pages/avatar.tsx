import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import Avatar from '../components/Avatar';
import { authInitialProps } from '../lib/auth';
import { authType } from '../@types';

interface Props {
  authData: authType;
}

const AvatarPage: NextPage<Props> = ({ authData }) => {
  return (
    <Layout
      authData={authData}
      displayFooter
      displayNav
      title="Customize Avatar"
    >
      <Avatar />
    </Layout>
  );
};

AvatarPage.getInitialProps = async (ctx) => {
  const { user } = await authInitialProps(true)(ctx);

  return { authData: user };
};

export default AvatarPage;
