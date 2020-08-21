import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  TextareaAutosize,
  Typography,
} from '@material-ui/core';
import marked from 'marked';
import { sanitize } from 'dompurify';

interface Props {
  title: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  margin: {
    margin: 10,
  },
  padding: {
    padding: 10,
  },
  titleTextArea: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontFamily: 'Playfair Display',
    fontSize: 35,
    fontWeight: 500,
    margin: '10px 10px 0',
    resize: 'none',
    width: 'calc(100% - 15px)',
  },
  bodyTextArea: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: 20,
    fontWeight: 500,
    margin: '10px',
    resize: 'none',
    width: 'calc(100% - 15px)',
  },
});

const PostForm: React.FC<Props> = ({ title }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(1);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  // const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setPost(Object.assign(post, { [target.id]: target.value }));
  //   console.log(post);
  // };

  return (
    <Paper square elevation={0}>
      <Head>
        <title>{title}</title>
      </Head>

      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={6}>
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
                  >
                    Cover image
                  </Button>
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

                <Typography
                  dangerouslySetInnerHTML={{
                    __html: sanitize(marked(postBody)),
                  }}
                />
              </Paper>
            </TabPanel>
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Button
            className={classes.margin}
            color="primary"
            variant="contained"
          >
            Publish!
          </Button>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Paper>
  );
};

export default PostForm;
