import React from 'react';

import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost/CreatePost';

const App: React.FC = () => {
  return (
    <Layout title="Tsseract App">
      <CreatePost />
    </Layout>
  );
};
export default App;
