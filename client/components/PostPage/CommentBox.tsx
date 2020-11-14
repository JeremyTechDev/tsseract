import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextareaAutosize, Avatar, Button } from '@material-ui/core';

axios.defaults.baseURL = 'http://localhost:8080';

import useStyles from './styles';
import { iPost, iComment } from '../../@types';

interface Props {
  post: iPost;
  setComments: React.Dispatch<React.SetStateAction<iComment[]>>;
}

const CommentBox: React.FC<Props> = ({ post, setComments }) => {
  const classes = useStyles();
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    axios
      .post(`/api/posts/c/${post._id}`, { body })
      .then(({ data }: { data: iPost }) => {
        setComments(data.comments);
        setBody('');
      })
      .catch((error) => {
        alert('Ops! Something went wrong, we could not save your comment :c');
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} alignItems="flex-start" justify="center">
        <Grid item xs={1} container justify="flex-end">
          <Avatar className={classes.avatar}>J</Avatar>
        </Grid>

        <Grid item xs={9}>
          <TextareaAutosize
            className={classes.commentBox}
            onChange={({ target }) => setBody(target.value)}
            placeholder="Have something to add?"
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
  );
};

export default CommentBox;
