import React from 'react';

import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost';

const App: React.FC = () => {
  return (
    <Layout title="Tsseract App">
      <CreatePost title="Create Post" />
    </Layout>
  );
};
export default App;
