import React, { useState, useContext } from 'react';
import Link from 'next/link';
import {
  Avatar,
  Container,
  IconButton,
  Grid,
  Link as MuiLink,
  Typography,
} from '@material-ui/core';

import AppContext from '../../context';
import { iComment } from '../../@types';
import useStyles from './styles';
import parseDate from '../../helpers/parseDate';
import { Delete } from '@material-ui/icons';
import { baseURL } from '../../lib/config';
import requestOptions from '../../helpers/requestOptions';

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
      fetch(`${baseURL}/api/posts/c/${_id}`, requestOptions({}, 'DELETE'))
        .then((res) => {
          if (res.status === 200) {
            setIsVisible(false);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return isVisible ? (
    <Container className={classes.commentContainer}>
      <Grid container justify="space-between">
        <Link href={`/profile/${user.username}`}>
          <MuiLink color="textPrimary" variant="subtitle1">
            <Grid container spacing={2} alignItems="center">
              <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
              <Grid item>{user.name}</Grid>
            </Grid>
          </MuiLink>
        </Link>

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
      </Grid>

      <Typography className={classes.commentBody} variant="body1">
        {body}
      </Typography>
    </Container>
  ) : null;
};

export default Comment;
