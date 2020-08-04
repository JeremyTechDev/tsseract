import React from 'react';
import Layout from '../components/layout';

import PostForm from '../components/postForm';

const App: React.FC = () => {
  return (
    <Layout title="Tsseract App">
      <PostForm title="Create Post" />
    </Layout>
  );
};
export default App;
