import React from 'react';
import Link from 'next/link';
import { Avatar, Link as MuiLink, Grid, Typography } from '@material-ui/core';

import useStyles from './styles';
import parseDate from '../../helpers/parseDate';
import { iUser } from '../../@types';

interface Props {
  user: iUser;
  createdAt: string;
  title: string;
}

const PostInfo: React.FC<Props> = ({ user, createdAt, title }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.fontColor}>
      <Grid spacing={1} container alignItems="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            {user.name[0].toUpperCase()}
          </Avatar>
        </Grid>

        <Grid item>
          <Link href={`/user/${user.username}`}>
            <MuiLink color="textPrimary" variant="h5">
              {user.name}
            </MuiLink>
          </Link>
          <Typography gutterBottom variant="subtitle2">
            {parseDate(createdAt)}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h3">{title}</Typography>
    </div>
  );
};

export default PostInfo;
