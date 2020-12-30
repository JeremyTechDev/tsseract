import React from 'react';
import { NextPage } from 'next';
import ErrorPage from 'next/error';

import Layout from '../../components/Layout';
import PostPage from '../../components/PostPage';
import { authInitialProps } from '../../lib/auth';
import { iPost, authType } from '../../@types';
import { getRequest } from '../../lib/fetch';

interface Props {
  post?: iPost;
  authData: authType;
}

const Post: NextPage<Props> = ({ post, authData }) => {
  return post && post._id ? (
    <Layout title={post.title} authData={authData} displayNav displayFooter>
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

Post.getInitialProps = async (ctx) => {
  const { postId } = ctx.query;

  const { user } = await authInitialProps()(ctx);
  const data = await getRequest(`/posts/id/${postId}`).then((res) =>
    res.json(),
  );

  return { post: data, authData: user };
};

export default Post;
