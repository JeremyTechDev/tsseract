import { NextPage } from 'next';

import Layout from '../components/Layout';
import Avatar from '../components/Avatar';
import { authInitialProps } from '../lib/auth';

const AvatarPage: NextPage = () => {
  return (
    <Layout title="Customize Avatar">
      <Avatar />
    </Layout>
  );
};

export const getServerSideProps = authInitialProps(true);

export default AvatarPage;
