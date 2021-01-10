import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import Posts from '../components/PostsList';
import { authInitialProps } from '../lib/auth';
import { iPost } from '../@types';
import { getRequest } from '../lib/fetch';

interface Props {
  posts: iPost[];
}

const PostList: NextPage<Props> = ({ posts }) => {
  return (
    <Layout title="Tsseract App - Posts">
      <Posts posts={posts} />
    </Layout>
  );
};

PostList.getInitialProps = async (ctx) => {
  await authInitialProps(true)(ctx);
  const data = await getRequest('/posts/').then((res) => res.json());

  return { posts: data };
};

export default PostList;
