import { FC } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { iComment } from '../../@types';

dayjs.extend(relativeTime);

interface Props {
  comment: iComment;
}

const Comment: FC<Props> = ({ comment }) => (
  <Grid key={comment._id} item xs={12} container direction="column" spacing={1}>
    <Grid item>
      <Divider />
    </Grid>

    <Grid item>
      <Typography variant="subtitle1">@{comment.user.username}</Typography>
    </Grid>

    <Grid item>
      <Typography>{comment.body}</Typography>
    </Grid>

    <Grid item>
      <Typography variant="body2">
        {dayjs(comment.createdAt).fromNow()}
      </Typography>
    </Grid>

    <Grid item>
      <Divider />
    </Grid>
  </Grid>
);

export default Comment;
