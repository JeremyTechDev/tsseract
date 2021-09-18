import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

import { iPost, iUser } from '../../@types';
import { logoutUser } from '../../lib/auth';
import { putRequest, deleteRequest } from '../../lib/fetch';
import Avatar from '../Avatar/Avatar';
import MessagePost from '../MessagePost';
import UserList from './UserList';
import useStyles from './styles';

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
  posts: postsProp,
  user: userProp,
}) => {
  const classes = useStyles();
  const [panel, setPanel] = useState<PanelType>('posts');
  const [isFollowing, setIsFollowing] = useState(isFollowingProp);
  const [user, setUser] = useState(userProp);
  const [posts, setPosts] = useState(postsProp);
  const largeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

  useEffect(() => {
    setUser(userProp);
    setPosts(postsProp);
  }, [userProp]);

  const toggleFollow = () => {
    putRequest(`/users/toggle-follow/${user.username}`)
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

  const deleteUser = () => {
    const confirmation = confirm(
      'Are you sure you want to close this account?\nYou cannot undo this action',
    );

    if (confirmation) {
      deleteRequest('/users')
        .then((res) => res.json())
        .then(() => logoutUser())
        .catch((err) => console.error(err));
    }
  };

  return (
    <Grid container>
      <Grid item md={1} sm="auto" />
      <Grid
        item
        md={2}
        sm={12}
        container
        alignItems="center"
        direction="column"
      >
        <Link href="/avatar">
          <Button title="Customize Avatar">
            <Avatar size="150px" avatar={user.avatar} />
          </Button>
        </Link>

        <Divider className={classes.divider} />

        <Typography>@{user.username}</Typography>
        <Typography variant="h4">{user.name}</Typography>

        <Divider className={classes.divider} />

        <Grid
          container
          direction={largeScreen ? 'column' : 'row'}
          justifyContent="center"
        >
          {panels.map((btn) => (
            <Button
              key={btn}
              onClick={() => setPanel(btn)}
              variant={panel === btn ? 'outlined' : 'text'}
            >
              {btn}
            </Button>
          ))}
        </Grid>

        <Divider className={classes.divider} />

        {(isProfile && (
          <Link href="/profile/edit">
            <Button color="secondary" variant="contained" endIcon={<Edit />}>
              Edit
            </Button>
          </Link>
        )) || (
          <Button onClick={toggleFollow} variant="contained" color="secondary">
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}

        <Grid item>
          <Button onClick={deleteUser} color="primary">
            Close Account
          </Button>
        </Grid>
      </Grid>

      <Grid item md={1} sm={1} />

      <Grid item md={7} sm={10}>
        <Container>
          {panel === 'posts' && (
            <Grid container direction="column-reverse">
              {posts.map((post, i) => (
                <MessagePost key={post._id} out={i === 48} post={post} />
              ))}
            </Grid>
          )}
          {panel === 'following' && (
            <UserList view="Following" users={user.following} />
          )}
          {panel === 'followers' && (
            <UserList view="Followers" users={user.followers} />
          )}
        </Container>
      </Grid>

      <Grid item md={1} sm={1} />
    </Grid>
  );
};

export default UserPage;
