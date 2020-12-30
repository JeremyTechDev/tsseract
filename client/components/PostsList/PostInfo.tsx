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
      <Link href={`/profile/${user.username}`}>
        <MuiLink color="textPrimary" variant="h5">
          <Grid spacing={1} container alignItems="center">
            <Grid item>
              <Avatar className={classes.avatar}>
                {user.name[0].toUpperCase()}
              </Avatar>
            </Grid>

            <Grid item>
              {user.name}
              <Typography gutterBottom variant="subtitle2">
                {parseDate(createdAt)}
              </Typography>
            </Grid>
          </Grid>
        </MuiLink>
      </Link>

      <Typography variant="h3">{title}</Typography>
    </div>
  );
};

export default PostInfo;
