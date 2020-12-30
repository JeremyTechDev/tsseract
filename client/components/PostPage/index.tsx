import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Link as MuiLink,
} from '@material-ui/core';

import { iPost, iTag } from '../../@types';
import Comment from './Comment';
import CommentBox from './CommentBox';
import parseDate from '../../helpers/parseDate';
import RichTextEditor from '../RichTextEditor';
import Tag from '../PostsList/Tag';
import useStyles from './styles';
import { baseURL } from '../../lib/config';
import requestOptions from '../../helpers/requestOptions';

interface Props {
  post: iPost;
  isSelfPost: boolean;
}

const PostPage: React.FC<Props> = ({ post, isSelfPost }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post.comments);
  const { cover, title, body, tags, user, createdAt } = post;

  const deletePost = () => {
    const confirmation = confirm(
      'Are you sure you want to delete this post?\nYou cannot undo this action',
    );

    if (confirmation) {
      fetch(`${baseURL}/api/posts/${post._id}`, requestOptions({}, 'DELETE'))
        .then((res) => {
          if (res.status === 200) {
            Router.replace('/posts');
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container className={classes.root} maxWidth="md">
      {cover && <img src={cover} alt={title} className={classes.img} />}

      <Typography variant="h1" paragraph>
        {title}
      </Typography>

      <Grid container justify="space-between">
        <Grid item>
          <Link href={`/profile/${user.username}`}>
            <MuiLink color="textPrimary" variant="subtitle1">
              <Grid container spacing={2} alignItems="center">
                <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
                <Grid item>{user.name}</Grid>
              </Grid>
            </MuiLink>
          </Link>
        </Grid>

        <Grid item>
          <Typography variant="subtitle2">{parseDate(createdAt)}</Typography>
        </Grid>
      </Grid>

      {isSelfPost && (
        <Grid container justify="flex-end">
          <Button onClick={deletePost} color="primary">
            Delete Post
          </Button>
        </Grid>
      )}

      <Grid item xs={12} sm={6} className={classes.commentBody}>
        <Grid container>
          {tags.map((tag: iTag) => (
            <Tag key={tag._id} tag={tag} />
          ))}
        </Grid>
      </Grid>

      <Divider light className={classes.divider} />

      <RichTextEditor readOnly value={JSON.parse(body)} />

      <Divider className={classes.divider} light />

      <Typography variant="h3" paragraph>
        Discussion
      </Typography>

      <CommentBox post={post} setComments={setComments} />

      {comments.length !== 0 ? (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        <Typography className={classes.divider} variant="body1" align="center">
          Be the first one to comment!
        </Typography>
      )}
    </Container>
  );
};

export default PostPage;
