import Head from 'next/head';
import { useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import {
  Badge,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import TouchApp from '@mui/icons-material/TouchApp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import PostHero from '../../components/Hero/Post';
import Avatar from '../../components/Avatar/Avatar';
import Comment from '../../components/Comment';
import NewComment from '../../components/Comment/New';
import ErrorPage from '../_error';
import RichTextEditor from '../../components/RichTextEditor';
import Tag from '../../components/Tag';
import { authInitialProps } from '../../lib/auth';
import { getRequest } from '../../lib/fetch';
import { iPost, authType, iComment } from '../../@types';

dayjs.extend(relativeTime);

interface Props {
  post: iPost;
  authData: authType;
}

const Post: NextPage<Props> = ({ post }) => {
  const [comments, setComments] = useState<iComment[]>(post.comments || []);

  if (!post || !post._id) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <PostHero cover={post.cover} title={post.title} />

      <Container maxWidth="md">
        <Grid container spacing={4} direction="column">
          <Grid item container>
            <Grid item xs={6} md={10} container alignItems="center">
              <Grid item>
                <Avatar avatar={post.user.avatar} size="100px" />
              </Grid>

              <Grid item>
                <Typography variant="h5">{post.user.name}</Typography>

                <Typography variant="subtitle1">
                  @{post.user.username}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              xs={6}
              md={2}
              container
              direction="column"
              alignItems="flex-end"
              justifyContent="flex-end"
            >
              <Grid item>
                <IconButton title="Interactions" size="large">
                  <Badge
                    badgeContent={post.interactions}
                    color="primary"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <TouchApp fontSize="large" />
                  </Badge>
                </IconButton>
              </Grid>

              <Grid item>
                <Typography variant="subtitle2" align="right">
                  {dayjs(post.createdAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <Grid item container spacing={1}>
            {post?.tags?.map((tag) => (
              <Grid item key={tag._id}>
                <Tag tag={tag} />
              </Grid>
            ))}
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <Grid item>
            <RichTextEditor readOnly value={JSON.parse(post.body)} />
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <NewComment postId={post._id} setNewComments={setComments} />

          <Grid item xs={12} md={8} container direction="column" spacing={1}>
            {comments?.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
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
