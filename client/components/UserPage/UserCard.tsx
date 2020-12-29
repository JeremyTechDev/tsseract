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
      <MuiLink color="textPrimary">
        <Link href={`/user/${user.username}`}>
          <Grid container>
            <CardMedia>
              <Avatar variant="rounded" className={classes.avatar}>
                {user.name[0]}
              </Avatar>
            </CardMedia>

            <CardContent>
              <Typography>@{user.username}</Typography>
              <Typography variant="h4">{user.name}</Typography>
            </CardContent>
          </Grid>
        </Link>
      </MuiLink>
    </Card>
  );
};

export default UserCard;
