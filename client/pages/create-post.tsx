import React from 'react';

import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost';
import withAuth from '../hooks/withAuth';

const CreatePostPage: React.FC = () => {
  return (
    <Layout title="Write a post">
      <CreatePost />
    </Layout>
  );
};

export default withAuth(CreatePostPage);
