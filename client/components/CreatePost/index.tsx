import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextareaAutosize,
  Tooltip,
  Typography,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Router from 'next/router';
import { Node } from 'slate';

import { initialValue } from '../RichTextEditor/Slate';
import requestOptions from '../../helpers/requestOptions';
import CoverImgModal from '../CoverImgModal';
import RichTextEditor from '../RichTextEditor';
import { InputChangeEvent } from '../../@types';

import useStyles from './styles';

const PostForm: React.FC = () => {
  const classes = useStyles();
  const [coverImg, setCoverImg] = useState('');
  const [showCoverImg, setShowCoverImg] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Node[]>(initialValue);
  const [tags, setTags] = useState<string[]>([]);
  const [tagsSearchResults, setTagsSearchResults] = useState<string[]>([]);

  const handleTagChange = (event: InputChangeEvent) => {
    fetch(`/api/tags/like/${event.target.value}`)
      .then((res) => res.json())
      .then((data) => setTagsSearchResults(data))
      .catch((err) => console.error(err));
  };

  const handleSubmit = () => {
    if (!title || !content || !coverImg) {
      return alert(
        'Make sure you a cover, a nice title and some content before you publish your post!',
      );
    }

    fetch(
      '/api/posts',
      requestOptions({
        body: JSON.stringify(content),
        cover: coverImg,
        tags: tags.splice(0, 4),
        title,
      }),
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

            <Paper elevation={3}>
              <Autocomplete
                freeSolo
                getLimitTagsText={() => ''}
                limitTags={4}
                multiple
                ChipProps={{
                  color: 'secondary',
                }}
                onChange={(_, options) => setTags([...options])}
                options={tagsSearchResults}
                value={tags}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.tagInput}
                    onChange={handleTagChange}
                    placeholder="Add up to 4 tags..."
                    variant="outlined"
                  />
                )}
              />
            </Paper>

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
