import React from 'react';
import { Grid, Typography, Avatar, Divider, Button } from '@material-ui/core';

import { iPost, iUser } from '../../@types';
import PostsList from '../PostsList/index';
import useStyles from './styles';

interface Props {
  user: iUser;
  posts: iPost[];
}

const UserPage: React.FC<Props> = ({ user, posts }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={1} className={classes.user}>
        <Avatar className={classes.avatar}>{user.name[0]}</Avatar>

        <Divider className={classes.divider} />

        <Typography>@{user.username}</Typography>
        <Typography variant="h4">{user.name}</Typography>

        <Divider className={classes.divider} />

        <Button>Posts</Button>
        <Button>Following</Button>
        <Button>Followers</Button>
      </Grid>
      <Grid item xs={7}>
        <PostsList posts={posts} />
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

export default UserPage;
