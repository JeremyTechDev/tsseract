import React from 'react';
import { NextPage, NextPageContext } from 'next';

import Layout from '../../components/Layout';
import PostPage from '../../components/PostPage';
import { authInitialProps } from '../../lib/auth';
import { iPost, authType } from '../../@types';
import { getRequest } from '../../lib/fetch';
import ErrorPage from '../_error';

interface Props {
  post?: iPost;
  authData: authType;
}

const Post: NextPage<Props> = ({ post, authData }) => {
  return post && post._id ? (
    <Layout title={post.title}>
      <PostPage
        post={post}
        isSelfPost={post.user._id === authData.user?._id}
        isLikedProp={authData.user && post.likes.includes(authData.user?._id)}
      />
    </Layout>
  ) : (
    <ErrorPage statusCode={404} />
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { postId } = ctx.query;

  const {
    props: { user },
  } = authInitialProps()(ctx);
  const data = await getRequest(`/posts/id/${postId}`).then((res) =>
    res.json(),
  );

  return { props: { post: data, authData: user } };
};

export default Post;
