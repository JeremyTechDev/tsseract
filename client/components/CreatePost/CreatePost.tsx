import React, { useState } from 'react';
import {
  Button,
  Grid,
  Container,
  Paper,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Tooltip,
} from '@material-ui/core';
import marked from 'marked';
import { BrokenImage } from '@material-ui/icons';

import TabPanel from '../TabPanel';
import useStyles from './styles';

const PostForm: React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [coverImage, setCoverImg] = useState('');
  const [showCoverImg, setShowCoverImg] = useState(false);
  const [imgFound, setImgFound] = useState(false);

  const imgExists = (url: string) => {
    const http = new XMLHttpRequest();

    http.open('HEAD', url, false);
    http.send();

    return http.status !== 404;
  };

  const handleImage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value: url } = event.target;

    setCoverImg(url);
    setImgFound(imgExists(url));
  };

  const clearImg = () => {
    setShowCoverImg(false);
    setCoverImg('');
  };

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
                  {(coverImage && (
                    <Tooltip placement="top" title="Click to change">
                      <img
                        alt="Cover Image"
                        className={classes.coverImg}
                        src={coverImage}
                        onClick={() => setShowCoverImg(!showCoverImg)}
                      />
                    </Tooltip>
                  )) || (
                    <Button
                      className={classes.margin}
                      color="primary"
                      variant="outlined"
                      onClick={() => setShowCoverImg(!showCoverImg)}
                    >
                      Cover image
                    </Button>
                  )}
                </Grid>

                {showCoverImg && (
                  <Modal
                    aria-describedby="Add cover image to the post"
                    aria-labelledby="Cover Image Modal"
                    className={classes.modal}
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500 }}
                    closeAfterTransition
                    onClose={() => setShowCoverImg(false)}
                    open={showCoverImg}
                  >
                    <Fade in={showCoverImg}>
                      <Paper className={classes.paper}>
                        <Typography paragraph variant="subtitle1">
                          Copy an image URL and paste it here
                        </Typography>
                        <TextField
                          fullWidth
                          label="Cover URL"
                          onChange={(event) => handleImage(event)}
                          value={coverImage}
                        />
                        {coverImage && (
                          <React.Fragment>
                            {(imgFound && (
                              <img
                                alt="Cover Image"
                                className={classes.coverImg}
                                src={coverImage}
                              />
                            )) || (
                              <Grid
                                className={classes.padding}
                                container
                                direction="column"
                                alignItems="center"
                              >
                                <BrokenImage color="error" fontSize="large" />
                                <Typography color="error">
                                  Image not found
                                </Typography>
                              </Grid>
                            )}
                          </React.Fragment>
                        )}

                        <Container className={classes.modalBtns}>
                          <Button onClick={clearImg} color="primary">
                            Remove
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => setShowCoverImg(false)}
                            variant="contained"
                          >
                            Save
                          </Button>
                        </Container>
                      </Paper>
                    </Fade>
                  </Modal>
                )}

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
                <img
                  alt="Cover Image"
                  className={classes.coverImg}
                  src={coverImage}
                />

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
      </Grid>
    </Container>
  );
};

export default PostForm;
