import { NextPage } from 'next';

import Login from '../components/Login';
import Layout from '../components/Layout';
import getRandomImg from '../helpers/getRandomImg';
import { iBackgroundImageData } from '../@types';

interface Props {
  bgData: iBackgroundImageData;
}

const LoginPage: NextPage<Props> = ({ bgData }) => {
  return (
    <Layout title="Login to Tsseract" displayFooter={false} displayNav={false}>
      <Login bgData={bgData} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const bgData = await getRandomImg();
  return {
    props: { bgData },
  };
};

export default LoginPage;
