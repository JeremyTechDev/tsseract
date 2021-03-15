import { NextPage, NextPageContext } from 'next';
import { Grid } from '@material-ui/core';

import ChatLayout from '../components/Layout/Chat';
import TagBarLayout from '../components/Layout/TagBar';
import PostRecievedMessage from '../components/MessagePost';
import { authInitialProps } from '../lib/auth';
import { getRequest } from '../lib/fetch';
import { iPost } from '../@types';

interface Props {
  posts: [iPost];
}

const Feed: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Grid container>
        <Grid item sm={3}>
          <TagBarLayout>hola</TagBarLayout>
        </Grid>

        <Grid item sm={9}>
          <ChatLayout>
            <Grid container direction="column-reverse">
              {posts.map((post, i) => (
                <PostRecievedMessage
                  key={post._id}
                  out={i === 48}
                  post={post}
                />
              ))}
            </Grid>
          </ChatLayout>
        </Grid>
      </Grid>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  authInitialProps(true)(ctx);
  const posts = await getRequest('/posts/').then((res) => res.json());

  return { props: { posts } };
};

export default Feed;
