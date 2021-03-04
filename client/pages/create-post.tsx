import { NextPage } from 'next';

import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost';
import { authInitialProps } from '../lib/auth';

const CreatePostPage: NextPage = () => {
  return (
    <Layout title="Write a post">
      <CreatePost />
    </Layout>
  );
};

export const getServerSideProps = authInitialProps(true);

export default CreatePostPage;
