import React from 'react';
import { NextPage } from 'next';
import ErrorPage from 'next/error';

import Layout from '../../components/Layout';
import PostPage from '../../components/PostPage';
import { iPost } from '../../@types';

interface Props {
  post?: iPost;
  error?: { statusCode: number };
}

const Post: NextPage<Props> = ({ post, error }: Props) => {
  return post ? (
    <Layout title={post.title} displayNav>
      <PostPage post={post} />
    </Layout>
  ) : (
    <ErrorPage statusCode={error?.statusCode || 500} />
  );
};

Post.getInitialProps = async ({ query }) => {
  const { postId } = query;

  const res = await fetch(`http://localhost:8080/api/posts/id/${postId}`);
  const data = await res.json();

  if (data.error) {
    return { error: { ...data.error, statusCode: res.status } };
  }

  return { post: data };
};

export default Post;
