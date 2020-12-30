import { NextPage } from 'next';
import Error from 'next/error';

import Layout from '../../components/Layout';
import UserPage from '../../components/UserPage';
import { authInitialProps } from '../../lib/auth';
import { authType, iPost, iUser } from '../../@types';
import { baseURL } from '../../lib/config';

interface Props {
  user: iUser;
  posts: iPost[];
  authData: authType;
}

const User: NextPage<Props> = ({ user, posts, authData }) => {
  return !user.error ? (
    <Layout authData={authData} title={user.name} displayNav displayFooter>
      <UserPage
        user={user}
        posts={posts}
        isProfile={user._id === authData.user?._id}
        isFollowing={authData.user && user._id in authData.user.following}
      />
    </Layout>
  ) : (
    <Error statusCode={404} />
  );
};

User.getInitialProps = async (ctx) => {
  const { username } = ctx.query;

  const { user: authUser } = await authInitialProps()(ctx);
  const authData = await fetch(
    `${baseURL}/api/users/${authUser.user?._id}`,
  ).then((res) => res.json());

  const user = await fetch(`${baseURL}/api/users/u/${username}`).then((res) =>
    res.json(),
  );

  const posts = await fetch(`${baseURL}/api/posts/by/${user._id}`).then((res) =>
    res.json(),
  );

  return { user, authData: { user: authData }, posts };
};

export default User;
