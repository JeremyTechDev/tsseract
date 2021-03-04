import { NextPage, NextPageContext } from 'next';

import Layout from '../../components/Layout';
import UserPage from '../../components/UserPage';
import { authInitialProps } from '../../lib/auth';
import { authType, iPost, iUser } from '../../@types';
import { getRequest } from '../../lib/fetch';
import Error from '../_error';

interface Props {
  user: iUser;
  posts: iPost[];
  authData: authType;
}

const User: NextPage<Props> = ({ user, posts, authData }) => {
  return !user.error ? (
    <Layout title={user.name}>
      <UserPage
        user={user}
        posts={posts}
        authUserId={authData.user?._id as string}
        isFollowing={authData.user && user._id in authData.user.following}
      />
    </Layout>
  ) : (
    <Error statusCode={404} />
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { userId } = ctx.query;

  const {
    props: { user: authUser },
  } = authInitialProps()(ctx);
  const authData = await getRequest(
    `/users/${authUser.user?._id}`,
  ).then((res) => res.json());

  const user = await getRequest(`/users/${userId}`).then((res) => res.json());

  const posts = await getRequest(`/posts/by/${user._id}`).then((res) =>
    res.json(),
  );

  return { props: { user, authData: { user: authData }, posts } };
};

export default User;
