import React, { useState } from 'react';
import { Grid, Typography, Avatar, Divider, Button } from '@material-ui/core';

import { iPost, iUser } from '../../@types';
import PostsList from '../PostsList/index';
import useStyles from './styles';
import UserCard from './UserCard';

interface Props {
  user: iUser;
  posts: iPost[];
}
type PanelType = 'posts' | 'following' | 'followers';
const panels: PanelType[] = ['posts', 'following', 'followers'];

const UserPage: React.FC<Props> = ({ user, posts }) => {
  const classes = useStyles();
  const [panel, setPanel] = useState<PanelType>('posts');

  return (
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={1} className={classes.user}>
        <Avatar className={classes.avatar}>{user.name[0]}</Avatar>

        <Divider className={classes.divider} />

        <Typography>@{user.username}</Typography>
        <Typography variant="h4">{user.name}</Typography>

        <Divider className={classes.divider} />

        {panels.map((btn) => (
          <Button
            onClick={() => setPanel(btn)}
            variant={panel === btn ? 'outlined' : 'text'}
          >
            {btn}
          </Button>
        ))}
      </Grid>

      <Grid item xs={7}>
        {panel === 'posts' && <PostsList posts={posts} />}
        <Grid container>
          {panel === 'following'
            ? (user.following.length &&
                user.following.map((userInfo) => (
                  <UserCard user={userInfo} />
                ))) || (
                <Typography variant="subtitle1">
                  {user.name} does not follow any users
                </Typography>
              )
            : null}
          {panel === 'followers'
            ? (user.followers.length &&
                user.followers.map((userInfo) => (
                  <UserCard user={userInfo} />
                ))) || (
                <Typography variant="subtitle1">
                  {user.name} has no followers
                </Typography>
              )
            : null}
        </Grid>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

export default UserPage;
