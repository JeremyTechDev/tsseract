import { FC, ChangeEventHandler, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

import { postRequest } from '../../lib/fetch';
import { iComment } from '../../@types';

interface Props {
  postId: string;
  setNewComments: (newComments: iComment[]) => void;
}

const NewComment: FC<Props> = ({ postId, setNewComments }) => {
  const [body, setBody] = useState('');

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async () => {
    postRequest(`/posts/c/anonymous/${postId}`, { body })
      .then((res) => res.json())
      .then((data) => {
        setNewComments(data.comments as iComment[]);
        setBody('');
      })
      .catch((err) => console.error(err));
  };

  return (
    <Grid
      item
      xs={12}
      md={8}
      container
      direction="column"
      justifyContent="flex-end"
      spacing={1}
    >
      <Grid item>
        <TextField
          color="primary"
          fullWidth
          inputProps={{ maxLength: 255 }}
          label="Have anything in mind? Express yourself!"
          multiline
          onChange={handleChange}
          placeholder="Be nice to people, unless you have inside jokes 😉"
          value={body}
          variant="outlined"
        />
      </Grid>

      <Grid item>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Comment
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewComment;
