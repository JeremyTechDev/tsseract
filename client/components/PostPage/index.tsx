import React from 'react';
import {
  Avatar,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';

import { iPost } from '../../@types';
import { markDown } from '../../helpers/markDown';
import Comment from './Comment';
import parseDate from '../../helpers/parseDate';
import Tag from '../PostsList/Tag';
import useStyles from './styles';
import '../../../../scss/createPost.scss';

interface Props {
  post: iPost;
}

const PostPage: React.FC<Props> = ({ post }: Props) => {
  const classes = useStyles();
  const { cover, title, body, tags, comments, user, createdAt } = post;

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

      {tags.map((tag) => (
        <Tag tag={tag} />
      ))}

      <Divider light />

      <div
        className="preview__result"
        dangerouslySetInnerHTML={markDown(body)}
      />

      <Divider className={classes.divider} light />

      <Typography variant="h3" paragraph>
        Discussion
      </Typography>

      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </Container>
  );
};

export default PostPage;
