import { NextPage, NextPageContext } from 'next';
import {
  Badge,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core';
import { Favorite, TouchApp } from '@material-ui/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import PostHero from '../../components/Hero/Post';
import Avatar from '../../components/Avatar/Avatar';
import ErrorPage from '../_error';
import RichTextEditor from '../../components/RichTextEditor';
import Link from '../../components/Link';
import Tag from '../../components/Tag';
import { authInitialProps } from '../../lib/auth';
import { getRequest } from '../../lib/fetch';
import { iPost, authType } from '../../@types';

dayjs.extend(relativeTime);

interface Props {
  post: iPost;
  authData: authType;
}

const Post: NextPage<Props> = ({ post }) => {
  if (!post || !post._id) {
    return <ErrorPage statusCode={404} />;
  }

  const {
    body,
    cover,
    createdAt,
    interactions,
    likes,
    tags,
    title,
    user,
  } = post;

  return (
    <>
      <PostHero cover={cover} title={title} />

      <Container maxWidth="md" style={{ height: 5000 }}>
        <Grid container>
          <Grid item xs={10} container alignItems="center">
            <Link href={`/profile/${user.username}`}>
              <Avatar avatar={user.avatar} size="100px" />
            </Link>

            <Grid item>
              <Link href={`/profile/${user.username}`}>
                <Typography variant="h5">{user.name}</Typography>
              </Link>

              <Link href={`/profile/${user.username}`}>
                <Typography variant="subtitle1">@{user.username}</Typography>
              </Link>
            </Grid>
          </Grid>

          <Grid
            item
            xs={2}
            container
            alignItems="center"
            justify="space-evenly"
          >
            <IconButton>
              <Badge
                badgeContent={likes.length}
                color="primary"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Favorite fontSize="large" />
              </Badge>
            </IconButton>

            <IconButton>
              <Badge
                badgeContent={interactions}
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

        <Typography variant="subtitle2" align="right">
          {dayjs(createdAt).fromNow()}
        </Typography>

        {tags.length && (
          <Box margin="30px auto">
            <Divider />
            <Box margin="10px auto">
              <Grid container>
                {tags.map((tag) => (
                  <Tag key={tag._id} tag={tag} />
                ))}
              </Grid>
            </Box>
            <Divider />
          </Box>
        )}

        <RichTextEditor readOnly value={JSON.parse(body)} />
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
