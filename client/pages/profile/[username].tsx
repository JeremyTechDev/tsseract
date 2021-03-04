import { NextPage, NextPageContext } from "next";

import Layout from "../../components/Layout";
import UserPage from "../../components/UserPage";
import { authInitialProps } from "../../lib/auth";
import { authType, iPost, iUser } from "../../@types";
import { getRequest } from "../../lib/fetch";
import Error from "../_error";

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
        isProfile={user._id === authData.user?._id}
        isFollowing={authData.user && user._id in authData.user.following}
      />
    </Layout>
  ) : (
    <Error statusCode={404} />
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { username } = ctx.query;

  const {
    props: { user: authUser },
  } = authInitialProps()(ctx);
  const authData = await getRequest(
    `/users/${authUser.user?._id}`
  ).then((res) => res.json());

  const user = await getRequest(`/users/u/${username}`).then((res) =>
    res.json()
  );

  const posts = await getRequest(`/posts/by/${user._id}`).then((res) =>
    res.json()
  );

  return { props: { user, authData: { user: authData }, posts } };
};

export default User;
