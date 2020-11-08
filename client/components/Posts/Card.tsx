import React from 'react';
import { Paper, Grid, Container, Button } from '@material-ui/core';
import { Favorite as Like, Comment } from '@material-ui/icons';

import useStyles from './styles';
import PostInfo from './PostInfo';
import { iPost } from '../../@types';

interface Props {
  post: iPost;
}

const Card: React.FC<Props> = ({ post }: Props) => {
  const classes = useStyles();
  const { cover, user, title, createdAt, likes } = post;

  return (
    <Paper className={classes.paper} elevation={5}>
      {(cover && (
        <Container className={classes.coverContainer}>
          <img className={classes.coverImg} src={cover} alt={title} />

          <Grid
            container
            justify="flex-start"
            alignItems="flex-end"
            className={classes.coverContent}
          >
            <Grid item className={classes.padding}>
              <PostInfo user={user} title={title} createdAt={createdAt} />
            </Grid>
          </Grid>
        </Container>
      )) || (
        <Container className={classes.padding}>
          <PostInfo user={user} title={title} createdAt={createdAt} />
        </Container>
      )}

      <Container className={classes.contentBtns}>
        <Button
          className={classes.btn}
          color="primary"
          startIcon={<Like />}
          variant="contained"
        >
          {likes.length} likes
        </Button>

        <Button
          className={classes.btn}
          color="primary"
          startIcon={<Comment />}
          variant="contained"
        >
          Add a comment
        </Button>
      </Container>
    </Paper>
  );
};

export default Card;
