import React from 'react';
import { NextPage } from 'next';
import ErrorPage from 'next/error';

import Layout from '../../components/Layout';
import PostPage from '../../components/PostPage';
import { authInitialProps } from '../../lib/auth';
import { iPost, authType } from '../../@types';

interface Props {
  post?: iPost;
  error?: { statusCode: number };
  authData: authType;
}

const Post: NextPage<Props> = ({ post, error, authData }: Props) => {
  return post ? (
    <Layout title={post.title} authData={authData} displayNav displayFooter>
      <PostPage post={post} />
    </Layout>
  ) : (
    <ErrorPage statusCode={error?.statusCode || 500} />
  );
};

Post.getInitialProps = async (ctx) => {
  const { postId } = ctx.query;

  const { user } = await authInitialProps()(ctx);
  const data = await fetch(
    `http://localhost:8080/api/posts/id/${postId}`,
  ).then((res) => res.json());

  return { post: data, authData: user };
};

export default Post;
