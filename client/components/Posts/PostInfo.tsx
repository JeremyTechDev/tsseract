import React from 'react';
import { Typography } from '@material-ui/core';

import parseDate from '../../helpers/parseDate';

interface Props {
  user: { name: string };
  createdAt: string;
  title: string;
}

const PostInfo: React.FC<Props> = ({ user, createdAt, title }: Props) => {
  return (
    <React.Fragment>
      <Typography variant="h5">{user.name}</Typography>
      <Typography gutterBottom variant="subtitle2">
        {parseDate(createdAt)}
      </Typography>

      <Typography variant="h3">{title}</Typography>
    </React.Fragment>
  );
};

export default PostInfo;
