import React, { useState } from 'react';
import { Avatar, Button, Divider, Grid, Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import { iPost, iUser } from '../../@types';
import PostsList from '../PostsList/index';
import useStyles from './styles';
import UserList from './UserList';
import { baseURL } from '../../lib/config';
import requestOptions from '../../helpers/requestOptions';

interface Props {
  user: iUser;
  posts: iPost[];
  isFollowing: boolean | null;
  isProfile: boolean;
}
type PanelType = 'posts' | 'following' | 'followers';
const panels: PanelType[] = ['posts', 'following', 'followers'];

const UserPage: React.FC<Props> = ({
  isFollowing: isFollowingProp,
  isProfile,
  posts,
  user: userProp,
}) => {
  const classes = useStyles();
  const [panel, setPanel] = useState<PanelType>('posts');
  const [isFollowing, setIsFollowing] = useState(isFollowingProp);
  const [user, setUser] = useState(userProp);

  const toggleFollow = () => {
    fetch(
      `${baseURL}/api/users/toggle-follow/${user.username}`,
      requestOptions({}, 'PUT'),
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.action === 'unfollow') {
          delete user.followers[data.following._id];
        } else {
          user.followers[data.following._id] = data.following;
        }
        setUser(user);
        setIsFollowing((prev) => !prev);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Grid container>
      <Grid item md={4} sm={1} />
      <Grid item md={1} sm={2} className={classes.user}>
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

        <Divider className={classes.divider} />

        {(isProfile && (
          <Button color="secondary" variant="contained" endIcon={<Edit />}>
            Edit
          </Button>
        )) || (
          <Button onClick={toggleFollow} variant="contained" color="secondary">
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </Grid>

      <Grid item md={6} sm={8}>
        {panel === 'posts' && <PostsList posts={posts} />}
        {panel === 'following' && <UserList users={user.following} />}
        {panel === 'followers' && <UserList users={user.followers} />}
      </Grid>
      <Grid item md={2} sm={1} />
    </Grid>
  );
};

export default UserPage;
