import React from 'react';
import Axios from 'axios';
import { NextPage } from 'next';

Axios.defaults.baseURL = 'http://localhost:8080';

import Layout from '../../components/Layout';
import PostPage from '../../components/PostPage';
import { iPost } from '../../@types';

interface Props {
  post: { data: iPost };
}

const Post: NextPage<Props> = ({ post: { data } }: Props) => {
  return (
    <Layout title={data.title} displayNav>
      <PostPage post={data} />
    </Layout>
  );
};

Post.getInitialProps = async ({ query }) => {
  const { postId } = query;

  const res = await fetch(`/api/posts/id/${postId}`);
  const data = await res.json();

  return { post: data.data };
};

export default Post;
