import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextareaAutosize,
  Typography,
  TextField,
  Tooltip,
  Fab,
} from '@material-ui/core';
import { Assignment, AssignmentTurnedIn } from '@material-ui/icons';
import marked from 'marked';

import TabPanel from '../TabPanel';
import CoverImgModal from '../CoverImgModal';
import useStyles from './styles';
import useCopyToClipBoard from '../../hooks/useCopyToClipBoard';
import useForm from '../../hooks/useForm';

const PostForm: React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [values, handleChange] = useForm({ title: '', content: '' });
  const [coverImg, setCoverImg] = useState('');
  const [showCoverImg, setShowCoverImg] = useState(false);
  const [currImg, setCurrImg] = useState('');
  const [showImgModal, setShowImgModal] = useState(false);
  const [isCopied, handleCopy] = useCopyToClipBoard(2000);

  const openImgModal = () => {
    setCurrImg('');
    setShowImgModal(true);
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
                  name="title"
                  className={classes.titleTextArea}
                  defaultValue={values.title!}
                  maxLength={125}
                  onChange={handleChange}
                  placeholder="Add your post title here..."
                />

                <Typography className={classes.margin} variant="subtitle1">
                  Add up to 5 tags...
                </Typography>

                <Paper elevation={3}>
                  <Grid container alignItems="center" justify="flex-start">
                    <Button
                      className={classes.margin}
                      color="primary"
                      variant="outlined"
                      onClick={openImgModal}
                    >
                      Upload image
                    </Button>
                    <TextField
                      value={currImg}
                      className={classes.currImgInput}
                      disabled
                    />
                    <Fab
                      onClick={() => handleCopy(currImg)}
                      title="Copy Markdown for Image"
                      size="small"
                      color="secondary"
                    >
                      {isCopied ? <AssignmentTurnedIn /> : <Assignment />}
                    </Fab>
                  </Grid>
                </Paper>

                <TextareaAutosize
                  name="content"
                  className={classes.bodyTextArea}
                  defaultValue={values.content}
                  onChange={handleChange}
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
                  {values.title || 'The title of your post will apper here'}
                </Typography>

                {(values.content && (
                  <Typography
                    component="pre"
                    dangerouslySetInnerHTML={{
                      __html: marked(values.content, { sanitize: true }),
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
            img={coverImg}
            open={setShowCoverImg}
            setImg={setCoverImg}
          />
        )}

        {showImgModal && (
          <CoverImgModal
            requireCaption
            img={currImg}
            open={setShowImgModal}
            setImg={setCurrImg}
          />
        )}
      </Grid>
    </Container>
  );
};

export default PostForm;
