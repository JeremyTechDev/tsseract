import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextareaAutosize,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Router from 'next/router';
import { Node } from 'slate';

import { baseURL } from '../../lib/config';
import { initialValue } from '../RichTextEditor/Slate';
import requestOptions from '../../helpers/requestOptions';
import CoverImgModal from '../CoverImgModal';
import RichTextEditor from '../RichTextEditor';

import useStyles from './styles';

const PostForm: React.FC = () => {
  const classes = useStyles();
  const [coverImg, setCoverImg] = useState('');
  const [showCoverImg, setShowCoverImg] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Node[]>(initialValue);

  const handleSubmit = () => {
    if (!title || !content || !coverImg) {
      return alert(
        'Make sure you a cover, a nice title and some content before you publish your post!',
      );
    }

    fetch(
      baseURL + '/api/posts',
      requestOptions({ title, body: JSON.stringify(content), cover: coverImg }),
    )
      .then(({ status }) => {
        status !== 200
          ? alert('Sorry, an error ocurred while saving your post')
          : Router.push('/posts');
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container disableGutters maxWidth="xl">
      <Grid container>
        <Grid item md={2} />

        <Grid item xs={12} md={6}>
          <Paper square elevation={2}>
            <Grid justify="space-between" container>
              {(coverImg && (
                <Tooltip placement="top" title="Click to change">
                  <img
                    alt="Cover Image"
                    className={classes.coverImg}
                    src={coverImg}
                    onClick={() => setShowCoverImg(true)}
                  />
                </Tooltip>
              )) || (
                <Button
                  className={classes.margin}
                  color="primary"
                  variant="outlined"
                  onClick={() => setShowCoverImg(true)}
                >
                  Cover image
                </Button>
              )}
              <Typography variant="caption">{125 - title.length}</Typography>
            </Grid>

            <TextareaAutosize
              className={classes.titleTextArea}
              defaultValue={title}
              maxLength={125}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Add your post title here..."
            />

            <Typography className={classes.margin} variant="subtitle1">
              Add up to 5 tags...
            </Typography>

            <Container className={classes.richEditor}>
              <RichTextEditor value={content} setValue={setContent} />
            </Container>

            {showCoverImg && (
              <CoverImgModal
                img={coverImg}
                open={setShowCoverImg}
                setImg={setCoverImg}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            className={classes.margin}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Publish!
          </Button>
        </Grid>

        <Grid item md={2} />
      </Grid>
    </Container>
  );
};

export default PostForm;
