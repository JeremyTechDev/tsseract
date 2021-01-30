import React from 'react';
import Link from 'next/link';
import { Link as MuiLink, Grid, Typography } from '@material-ui/core';

import Avatar from '../Avatar/Avatar';
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
        <Link href={`/profile/${user._id}`}>
          <Avatar avatar={user.avatar} />
        </Link>

        <Grid item>
          <Link href={`/profile/${user._id}`}>
            <MuiLink color="textPrimary" variant="h5">
              {user.name}
            </MuiLink>
          </Link>
          <Typography gutterBottom variant="subtitle2">
            {parseDate(createdAt)}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h4">{title}</Typography>
    </div>
  );
};

export default PostInfo;
