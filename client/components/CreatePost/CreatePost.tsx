import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import marked from 'marked';

import TabPanel from '../TabPanel';
import useStyles from './styles';

const PostForm: React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [coverImage, setCoverImg] = useState('');
  const [showCoverImg, setShowCoverImg] = useState(false);

  return (
    <Paper square elevation={0}>
      <Grid container>
        <Grid item md={2} />
        <Grid item xs={12} md={6}>
          <Paper square elevation={2}>
            <Tabs
              centered
              indicatorColor="primary"
              onChange={(_, newTab) => setTab(newTab)}
              textColor="primary"
              value={tab}
            >
              <Tab label="Edit" />
              <Tab label="Preview" />
            </Tabs>

            <TabPanel value={tab} index={0}>
              <Paper elevation={4}>
                <Paper elevation={3}>
                  <Button
                    className={classes.margin}
                    color="primary"
                    variant="outlined"
                    onClick={() => setShowCoverImg(!showCoverImg)}
                  >
                    Cover image
                  </Button>
                  {showCoverImg && (
                    <TextField
                      variant="outlined"
                      placeholder="Paste the URL here..."
                    />
                  )}
                </Paper>

                <TextareaAutosize
                  className={classes.titleTextArea}
                  defaultValue={postTitle}
                  maxLength={125}
                  onChange={({ target }) => setPostTitle(target.value)}
                  placeholder="Add your post title here..."
                />

                <Typography className={classes.margin} variant="subtitle1">
                  Add up to 5 tags...
                </Typography>

                <Paper elevation={3}>
                  <Button
                    className={classes.margin}
                    color="primary"
                    variant="outlined"
                  >
                    Upload image
                  </Button>
                </Paper>

                <TextareaAutosize
                  className={classes.bodyTextArea}
                  defaultValue={postBody}
                  onChange={({ target }) => setPostBody(target.value)}
                  placeholder="Write you post content here..."
                  rowsMin={10}
                />
              </Paper>
            </TabPanel>

            <TabPanel value={tab} index={1}>
              <Paper elevation={4}>
                <Typography className={classes.padding} variant="h3">
                  {postTitle || 'The title of your post will apper here'}
                </Typography>

                {(postBody && (
                  <Typography
                    component="pre"
                    dangerouslySetInnerHTML={{
                      __html: marked(postBody, { sanitize: true }),
                    }}
                  />
                )) || (
                  <Typography align="center" variant="subtitle1">
                    Start typing! You'll see your content here.
                  </Typography>
                )}
              </Paper>
            </TabPanel>
          </Paper>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            className={classes.margin}
            color="primary"
            variant="contained"
          >
            Publish!
          </Button>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </Paper>
  );
};

export default PostForm;
