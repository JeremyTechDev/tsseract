import React from 'react';
import {
  Button,
  Grid,
  Paper,
  TextareaAutosize,
  Tooltip,
  Typography,
} from '@material-ui/core';

import UploadImage from './UploadImg';
import CoverImgModal from '../CoverImgModal';
import { InputChangeEvent } from '../../types';

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

      <Typography className={classes.margin} variant="subtitle1">
        Add up to 5 tags...
      </Typography>

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
