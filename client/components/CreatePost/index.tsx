import React, { useState } from 'react';
import { Button, Container, Grid, Paper, Tab, Tabs } from '@material-ui/core';

import PreviewPost from './PreviewPost';
import TabPanel from './TabPanel';
import WritePost from './WritePost';
import useForm from '../../hooks/useForm';
import { baseURL } from '../../lib/config';
import requestOptions from '../../helpers/requestOptions';

import useStyles from './styles';

const PostForm: React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [post, handleChange] = useForm({ title: '', content: '' });
  const [coverImg, setCoverImg] = useState('');
  const [showCoverImg, setShowCoverImg] = useState(false);

  const handleSubmit = () => {
    const { title, content } = post;

    if (!title || !content || !coverImg) {
      return alert(
        'Make sure you a cover, a nice title and some content before you publish your post!',
      );
    }

    fetch(
      baseURL + '/api/posts',
      requestOptions({ title, body: content, cover: coverImg }),
    )
      .then((response) => alert(response.status))
      .catch((err) => console.error(err));
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
              <WritePost
                coverImg={coverImg}
                handleChange={handleChange}
                post={post}
                setCoverImg={setCoverImg}
                setShowCoverImg={setShowCoverImg}
                showCoverImg={showCoverImg}
              />
            </TabPanel>

            <TabPanel value={tab} index={1}>
              <PreviewPost post={post} coverImg={coverImg} />
            </TabPanel>
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
