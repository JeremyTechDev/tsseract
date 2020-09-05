import React from 'react';

import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost';

const CreatePostPage: React.FC = () => {
  return (
    <Layout title="Write a post">
      <CreatePost />
    </Layout>
  );
};

export default CreatePostPage;
