import React from 'react';
import { Paper, Grid, Container, Button } from '@material-ui/core';
import { Favorite as Like, Comment } from '@material-ui/icons';

import useStyles from './styles';
import PostInfo from './PostInfo';
import Tag from './Tag';
import { iPost, iTag } from '../../@types';

interface Props {
  post: iPost;
}

const Card: React.FC<Props> = ({ post }: Props) => {
  const classes = useStyles();
  const { cover, user, title, createdAt, likes, tags } = post;

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

      <Grid container justify="space-between" className={classes.contentBtns}>
        <Grid item>
          <Grid container>
            {tags.map((tag: iTag) => (
              <Grid item>
                <Tag key={tag._id} tag={tag} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
