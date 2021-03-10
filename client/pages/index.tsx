import { NextPage } from 'next';

import Layout from '../components/Layout';
import LandingPage from '../components/LandingPage';
import { authInitialProps } from '../lib/auth';

const Homepage: NextPage = () => {
  return (
    <Layout title="Tsseract" displayFooter={false} displayNav={false}>
      <LandingPage />
    </Layout>
  );
};

export const getServerSideProps = authInitialProps();

export default Homepage;
