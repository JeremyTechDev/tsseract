import React from 'react';
import { Container, Grid, Typography, Avatar } from '@material-ui/core';

import { iComment } from '../../@types';
import useStyles from './styles';
import parseDate from '../../helpers/parseDate';

interface Props {
  comment: iComment;
}

const Comment: React.FC<Props> = ({ comment }: Props) => {
  const classes = useStyles();
  const { body, user, createdAt } = comment;

  return (
    <Container className={classes.commentContainer}>
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

      <Typography className={classes.commentBody} variant="body1">
        {body}
      </Typography>
    </Container>
  );
};

export default Comment;
