import React, { useState, useContext } from 'react';
import Link from 'next/link';
import {
  Divider,
  IconButton,
  Grid,
  Link as MuiLink,
  Typography,
  Box,
} from '@material-ui/core';

import Avatar from '../Avatar/Avatar';
import AppContext from '../../context';
import { iComment } from '../../@types';
import useStyles from './styles';
import parseDate from '../../helpers/parseDate';
import { Delete } from '@material-ui/icons';
import { deleteRequest } from '../../lib/fetch';

interface Props {
  comment: iComment;
}

const Comment: React.FC<Props> = ({ comment }: Props) => {
  const classes = useStyles();
  const {
    state: { user: authUser },
  } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(true);
  const { body, user, createdAt, _id } = comment;

  const deleteComment = () => {
    const confirmation = confirm(
      'Are you sure you want to delete this comment?\nYou cannot undo this action',
    );

    if (confirmation) {
      deleteRequest(`/posts/c/${_id}`)
        .then((res) => {
          if (res.status === 200) {
            setIsVisible(false);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return isVisible ? (
    <>
      <Grid container justify="space-between">
        <Link href={`/profile/${user._id}`}>
          <MuiLink color="textPrimary" variant="subtitle1">
            <Grid container direction="row" alignItems="center">
              <Avatar avatar={user.avatar} />
              <Typography variant="h5">{user.name}</Typography>
            </Grid>
          </MuiLink>
        </Link>

        <Box>
          <Grid container justify="flex-end" alignItems="center">
            <Typography variant="subtitle2">{parseDate(createdAt)}</Typography>
            {authUser && authUser._id === user._id && (
              <IconButton
                onClick={deleteComment}
                size="small"
                title="Delete Comment"
              >
                <Delete />
              </IconButton>
            )}
          </Grid>
        </Box>
      </Grid>

      <Typography className={classes.commentBody} variant="body1">
        {body}
      </Typography>

      <Divider className={classes.divider} variant="middle" />
    </>
  ) : null;
};

export default Comment;
