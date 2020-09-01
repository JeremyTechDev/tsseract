import React from 'react';

import Layout from '../components/Layout';
// import CreatePost from '../components/CreatePost';
import Login from '../components/Login';

const App: React.FC = () => {
  return (
    <Layout title="Tsseract App">
      <Login />
      {/* <CreatePost /> */}
    </Layout>
  );
};
export default App;
