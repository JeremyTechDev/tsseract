import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

axios.defaults.baseURL = 'http://localhost:8080';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/posts/');

      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <Container disableGutters maxWidth="md">
      <Grid container>
        <Typography variant="h4">Posts</Typography>
      </Grid>
    </Container>
  );
};

export default Posts;
