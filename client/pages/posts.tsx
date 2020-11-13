import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/Layout';
import Posts from '../components/PostsList';
import { iPost } from '../@types';

interface Props {
  posts: iPost[];
}

const PostList: NextPage<Props> = ({ posts }: Props) => {
  return (
    <Layout title="Tsseract App - Posts" displayNav>
      <Posts posts={posts} />
    </Layout>
  );
};

PostList.getInitialProps = async () => {
  const res = await fetch('http://localhost:8080/api/posts/');
  const data = await res.json();

  // TODO: handle error or no posts

  return { posts: data };
};

export default PostList;
