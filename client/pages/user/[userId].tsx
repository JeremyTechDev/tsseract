import { NextPage } from 'next';
import Error from 'next/error';

import Layout from '../../components/Layout';
import UserPage from '../../components/UserPage';
import { authInitialProps } from '../../lib/auth';
import { authType, iUser } from '../../@types';
import { baseURL } from '../../lib/config';

interface Props {
  user: iUser;
  authData: authType;
}

const User: NextPage<Props> = ({ user, authData }) => {
  return !user.error ? (
    <Layout authData={authData} title={user.name} displayNav displayFooter>
      <UserPage user={user} />
    </Layout>
  ) : (
    <Error statusCode={404} />
  );
};

User.getInitialProps = async (ctx) => {
  const { userId } = ctx.query;

  const { user: authData } = await authInitialProps()(ctx);
  const user = await fetch(`${baseURL}/api/users/${userId}`).then((res) =>
    res.json(),
  );

  return { user, authData };
};

export default User;
