import { useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import {
  Badge,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Favorite, TouchApp } from '@material-ui/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import PostHero from '../../components/Hero/Post';
import Avatar from '../../components/Avatar/Avatar';
import Comment from '../../components/Comment';
import NewComment from '../../components/Comment/New';
import ErrorPage from '../_error';
import RichTextEditor from '../../components/RichTextEditor';
import Link from '../../components/Link';
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
      <PostHero cover={post.cover} title={post.title} />

      <Container maxWidth="md">
        <Grid container spacing={4} direction="column">
          <Grid item container>
            <Grid item xs={6} md={10} container alignItems="center">
              <Grid item>
                <Link href={`/profile/${post.user.username}`}>
                  <Avatar avatar={post.user.avatar} size="100px" />
                </Link>
              </Grid>

              <Grid item>
                <Link href={`/profile/${post.user.username}`}>
                  <Typography variant="h5">{post.user.name}</Typography>
                </Link>

                <Link href={`/profile/${post.user.username}`}>
                  <Typography variant="subtitle1">
                    @{post.user.username}
                  </Typography>
                </Link>
              </Grid>
            </Grid>

            <Grid
              item
              xs={6}
              md={2}
              container
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item>
                <IconButton title="Likes">
                  <Badge
                    badgeContent={post.likes.length}
                    color="primary"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Favorite fontSize="large" />
                  </Badge>
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton title="Interactions">
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
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="subtitle2" align="right">
              {dayjs(post.createdAt).fromNow()}
            </Typography>
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
