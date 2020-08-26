import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextareaAutosize,
  Tooltip,
  Typography,
} from '@material-ui/core';
import marked from 'marked';

import TabPanel from '../TabPanel';
import CoverImgModal from '../CoverImgModal';
import useStyles from './styles';

const PostForm: React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [showCoverImg, setShowCoverImg] = useState(false);

  return (
    <Container disableGutters maxWidth="xl">
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
                <Grid container>
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
                </Grid>

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
                {coverImg && (
                  <img
                    alt="Cover Image"
                    className={classes.coverImg}
                    src={coverImg}
                  />
                )}

                <Typography
                  className={classes.padding}
                  align="center"
                  variant="h3"
                >
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

        {showCoverImg && (
          <CoverImgModal
            coverImg={coverImg}
            handleClose={setShowCoverImg}
            setCoverImg={setCoverImg}
          />
        )}
      </Grid>
    </Container>
  );
};

export default PostForm;
