import React from 'react';
import { Paper, Typography } from '@material-ui/core';

import { markDown } from '../../helpers/markDown';

import useStyles from './styles';
import '../../../../scss/createPost.scss';
import 'highlight.js/scss/tomorrow-night-bright.scss';
import { PostAdd } from '@material-ui/icons';

interface Props {
  children?: React.ReactNode;
  coverImg: string;
  post: { title: string; content: string };
}

const PreviewPost: React.FC<Props> = ({ coverImg, post }) => {
  const classes = useStyles();

  return (
    <Paper elevation={4}>
      {coverImg && (
        <img alt="Cover Image" className={classes.coverImg} src={coverImg} />
      )}

      <Typography className={classes.padding} align="center" variant="h3">
        {post.title || 'The title of your post will apper here'}
      </Typography>

      {(post.content && (
        <Typography
          className="preview__result"
          component="pre"
          dangerouslySetInnerHTML={markDown(post.content)}
        />
      )) || (
        <Typography align="center" variant="subtitle1">
          Start typing! You'll see your content here.
        </Typography>
      )}
    </Paper>
  );
};

export default PreviewPost;
