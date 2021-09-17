import { NextPage, NextPageContext } from 'next';

import ErrorPage from '../_error';
import Layout from '../../components/Layout';
import EditPage from '../../components/UserPage/EditPage';
import { authInitialProps } from '../../lib/auth';
import { authType, iUser } from '../../@types';
import { getRequest } from '../../lib/fetch';

interface Props {
  user: authType;
  profile: iUser;
}

// THIS PAGE IS STILL UNDER DEVELOPMENT
const Edit: NextPage<Props> = ({ user, profile }) => {
  return <ErrorPage statusCode={404} />;
  return (
    <Layout title="Edit Profile">
      <EditPage profile={profile} user={user} />
    </Layout>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const {
    props: { user },
  } = authInitialProps(true)(ctx);

  const profile = await getRequest(`/users/${user.user?._id}`).then((res) =>
    res.json(),
  );

  return { props: { user, profile } };
};

export default Edit;
