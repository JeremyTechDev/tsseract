import { FC } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Avatar from '../Avatar/Avatar';
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

    <Grid item container alignItems="center" wrap="nowrap">
      {comment.user && (
        <Grid item>
          <Avatar avatar={comment.user.avatar} size="80px" />
        </Grid>
      )}

      <Grid item container direction="column">
        <Grid item>
          <Typography variant="subtitle1">
            @{comment?.user?.username || 'anonymous'}
          </Typography>
        </Grid>

        <Grid item>
          <Typography>{comment.body}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2">
            {dayjs(comment.createdAt).fromNow()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid item>
      <Divider />
    </Grid>
  </Grid>
);

export default Comment;
