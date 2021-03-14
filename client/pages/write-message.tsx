import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost';
import { authInitialProps } from '../lib/auth';

const CreatePostPage: NextPage = () => {
  const router = useRouter();

  return (
    <Layout title="Write a post">
      <CreatePost titleProp={router.query.title as string} />
    </Layout>
  );
};

export const getServerSideProps = authInitialProps(true);

export default CreatePostPage;
