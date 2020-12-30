import React, { useState, useContext } from 'react';
import { Grid, TextareaAutosize, Avatar, Button } from '@material-ui/core';

import AppContext from '../../context';
import useStyles from './styles';
import { iPost, iComment } from '../../@types';
import requestOptions from '../../helpers/requestOptions';

interface Props {
  post: iPost;
  setComments: React.Dispatch<React.SetStateAction<iComment[]>>;
  ref: React.RefObject<HTMLTextAreaElement>;
}

const CommentBox: React.FC<Props> = ({ post, setComments, ref }) => {
  const classes = useStyles();
  const { state } = useContext(AppContext);
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    fetch(`/api/posts/c/${post._id}`, requestOptions({ body }))
      .then((res) => res.json())
      .then((data: iPost) => {
        setComments(data.comments);
        setBody('');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('You need to log in to your account to be able to comment');
        } else {
          alert('Ops! Something went wrong, we could not save your comment :c');
        }
        console.error(error);
      });
  };

  return state.user ? (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} alignItems="flex-start" justify="center">
        <Grid item xs={1} container justify="flex-end">
          <Avatar className={classes.avatar}>{state.user?.name[0]}</Avatar>
        </Grid>

        <Grid item xs={9}>
          <TextareaAutosize
            className={classes.commentBox}
            onChange={({ target }) => setBody(target.value)}
            placeholder="Have something to add?"
            ref={ref}
            rowsMin={6}
            value={body}
          />
        </Grid>

        <Grid item xs={2} container justify="center">
          <Button
            disabled={body.trim().length === 0}
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
          >
            Publish
          </Button>
        </Grid>
      </Grid>
    </form>
  ) : null;
};

export default CommentBox;
