import React from 'react';
import Link from 'next/link';
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link as MuiLink,
  Typography,
} from '@material-ui/core';

import { iUser } from '../../@types';
import useStyles from './styles';

interface Props {
  user: iUser;
}

const UserCard: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <Card>
      <Grid container>
        <CardMedia>
          <Avatar variant="rounded" className={classes.avatar}>
            {user.name[0]}
          </Avatar>
        </CardMedia>

        <CardContent>
          <MuiLink color="textPrimary">
            <Link href={`/user/${user.username}`}>
              <Typography>@{user.username}</Typography>
            </Link>
          </MuiLink>
          <MuiLink color="textPrimary">
            <Link href={`/user/${user.username}`}>
              <Typography variant="h4">{user.name}</Typography>
            </Link>
          </MuiLink>
        </CardContent>
      </Grid>
    </Card>
  );
};

export default UserCard;
