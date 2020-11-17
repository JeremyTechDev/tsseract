import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost';
import { authInitialProps } from '../lib/auth';
import { authType } from '../@types';

interface Props {
  user: authType;
}

const CreatePostPage: NextPage<Props> = ({ user }) => {
  return (
    <Layout title="Write a post" authData={user} displayNav displayFooter>
      <CreatePost />
    </Layout>
  );
};

CreatePostPage.getInitialProps = authInitialProps(true);

export default CreatePostPage;
