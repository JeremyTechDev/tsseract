import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextareaAutosize,
  Typography,
  makeStyles,
} from '@material-ui/core';
import marked from 'marked';
import dompurify from 'dompurify';

// import '../../../scss/postForm.scss';

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
    resize: 'none',
    border: 'none',
    background: 'none',
    width: 'calc(100% - 15px)',
    color: '#fff',
    fontWeight: 500,
    fontSize: 25,
    margin: '10px 10px 0',
  },
  bodyTextArea: {
    resize: 'none',
    border: 'none',
    background: 'none',
    width: 'calc(100% - 15px)',
    color: '#fff',
    fontWeight: 500,
    fontSize: 20,
    margin: '10px',
  },
});

const PostForm: React.FC<Props> = ({ title }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(1);
  const [post, setPost] = useState({ title: '', tags: [], content: '' });

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(Object.assign(post, { [target.id]: target.value }));
    console.log(post);
  };

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
                  defaultValue={post.title}
                  maxLength={125}
                  onChange={(event) => handleChange(event)}
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
                  rowsMin={10}
                  className={classes.bodyTextArea}
                  defaultValue={post.content}
                  onChange={(event) => handleChange(event)}
                  placeholder="Write you post content here..."
                />
              </Paper>
            </TabPanel>

            <TabPanel value={tab} index={1}>
              <Paper elevation={4}>
                <Typography className={classes.padding} variant="h3">
                  {post.title || 'The title of your post will apper here'}
                </Typography>

                <Typography
                  dangerouslySetInnerHTML={{
                    __html: marked(post.content),
                  }}
                ></Typography>
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
