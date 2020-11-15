import React, { useState } from 'react';
import {
  Avatar,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';

import { iPost, iTag } from '../../@types';
import { markDown } from '../../helpers/markDown';
import Comment from './Comment';
import parseDate from '../../helpers/parseDate';
import CommentBox from './CommentBox';
import Tag from '../PostsList/Tag';
import useStyles from './styles';
import '../../../../scss/createPost.scss';

interface Props {
  post: iPost;
}

const PostPage: React.FC<Props> = ({ post }: Props) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post.comments);
  const { cover, title, body, tags, user, createdAt } = post;

  return (
    <Container className={classes.root} maxWidth="md">
      {cover && <img src={cover} alt={title} className={classes.img} />}

      <Typography variant="h1" paragraph>
        {title}
      </Typography>

      <Grid container justify="space-between">
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
            <Grid item>
              <Typography variant="subtitle1">{user.name}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="subtitle2">{parseDate(createdAt)}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.commentBody}>
        <Grid container>
          {tags.map((tag: iTag) => (
            <Tag tag={tag} />
          ))}
        </Grid>
      </Grid>

      <Divider light className={classes.divider} />

      <div
        className="preview__result"
        dangerouslySetInnerHTML={markDown(body)}
      />

      <Divider className={classes.divider} light />

      <Typography variant="h3" paragraph>
        Discussion
      </Typography>

      <CommentBox post={post} setComments={setComments} />

      {comments.length !== 0 ? (
        comments.map((comment) => <Comment comment={comment} />)
      ) : (
        <Typography className={classes.divider} variant="body1" align="center">
          Be the first one to comment!
        </Typography>
      )}
    </Container>
  );
};

export default PostPage;