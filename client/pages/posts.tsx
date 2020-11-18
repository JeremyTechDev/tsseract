import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import Posts from '../components/PostsList';
import { authInitialProps } from '../lib/auth';
import { baseURL } from '../lib/config';
import { authType, iPost } from '../@types';

interface Props {
  posts: iPost[];
  authData: authType;
}

const PostList: NextPage<Props> = ({ posts, authData }) => {
  return (
    <Layout
      title="Tsseract App - Posts"
      authData={authData}
      displayNav
      displayFooter
    >
      <Posts posts={posts} />
    </Layout>
  );
};

PostList.getInitialProps = async (ctx) => {
  const { user } = await authInitialProps()(ctx);
  const data = await fetch(baseURL + '/api/posts/').then((res) => res.json());

  return { posts: data, authData: user };
};

export default PostList;
