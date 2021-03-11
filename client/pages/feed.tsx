import { NextPage, NextPageContext } from 'next';
import { Grid } from '@material-ui/core';

import Layout from '../components/Layout';
import PostRecievedMessage from '../components/MessagePost/Received';
import { authInitialProps } from '../lib/auth';
import { getRequest } from '../lib/fetch';
import { iPost } from '../@types';

interface Props {
  posts: [iPost];
}

const Feed: NextPage<Props> = ({ posts }) => {
  return (
    <Layout title="Feed">
      <Grid container>
        <Grid item sm={3}>
          Insert Side Bar Here
        </Grid>

        <Grid item sm={9}>
          <PostRecievedMessage post={posts[0]} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  authInitialProps(true)(ctx);
  const posts = await getRequest('/posts/').then((res) => res.json());

  return { props: { posts } };
};

export default Feed;
