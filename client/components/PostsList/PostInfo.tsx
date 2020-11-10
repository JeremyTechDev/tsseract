import React from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';

import useStyles from './styles';
import parseDate from '../../helpers/parseDate';

interface Props {
  user: { name: string };
  createdAt: string;
  title: string;
}

const PostInfo: React.FC<Props> = ({ user, createdAt, title }: Props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid spacing={1} container alignItems="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            {user.name[0].toUpperCase()}
          </Avatar>
        </Grid>

        <Grid item>
          <Typography variant="h5">{user.name}</Typography>
          <Typography gutterBottom variant="subtitle2">
            {parseDate(createdAt)}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h3">{title}</Typography>
    </React.Fragment>
  );
};

export default PostInfo;
