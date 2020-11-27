import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextareaAutosize,
  Tooltip,
  Typography,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Label } from '@material-ui/icons';

import UploadImage from './UploadImg';
import CoverImgModal from '../CoverImgModal';
import { InputChangeEvent } from '../../@types';

import useStyles from './styles';

interface Props {
  children?: React.ReactNode;
  coverImg: string;
  handleChange: (event: InputChangeEvent) => void;
  post: { title: string; content: string };
  setCoverImg: React.Dispatch<React.SetStateAction<string>>;
  setShowCoverImg: React.Dispatch<React.SetStateAction<boolean>>;
  showCoverImg: boolean;
}

const WritePost: React.FC<Props> = ({
  coverImg,
  handleChange,
  post,
  setCoverImg,
  setShowCoverImg,
  showCoverImg,
}) => {
  const classes = useStyles();
  const [tags, setTags] = useState<string[]>([]);
  const [tagsSearchResults, setTagsSearchResults] = useState<string[]>([]);

  const handleTagChange = (event: InputChangeEvent) => {
    fetch(`/api/tags/like/${event.target.value}`)
      .then((res) => res.json())
      .then((data) => setTagsSearchResults(data))
      .catch((err) => console.error(err));
  };

  return (
    <React.Fragment>
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
        <Typography variant="caption">{125 - post.title.length}</Typography>
      </Grid>

      <TextareaAutosize
        name="title"
        className={classes.titleTextArea}
        defaultValue={post.title}
        maxLength={125}
        onChange={handleChange}
        placeholder="Add your post title here..."
      />

      <Paper elevation={3}>
        <Autocomplete
          freeSolo
          limitTags={4}
          multiple
          onChange={(_, options) => setTags([...options])}
          options={tagsSearchResults}
          value={tags}
          renderInput={(params) => (
            <TextField
              className={classes.tagInput}
              onChange={handleTagChange}
              placeholder="Add up to 4 tags..."
              {...params}
            />
          )}
        />
      </Paper>

      <Paper elevation={3}>
        <UploadImage />
      </Paper>

      <TextareaAutosize
        name="content"
        className={classes.bodyTextArea}
        defaultValue={post.content}
        onChange={handleChange}
        placeholder="Write you post content here..."
        rowsMin={10}
      />

      <Typography variant="caption" align="right">
        Markdown supported
      </Typography>

      {showCoverImg && (
        <CoverImgModal
          img={coverImg}
          open={setShowCoverImg}
          setImg={setCoverImg}
        />
      )}
    </React.Fragment>
  );
};

export default WritePost;
