import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost';
import { authInitialProps } from '../lib/auth';

const CreatePostPage: NextPage<{}> = () => {
  return (
    <Layout title="Write a post" displayNav displayFooter>
      <CreatePost />
    </Layout>
  );
};

CreatePostPage.getInitialProps = authInitialProps(true);
export default CreatePostPage;
