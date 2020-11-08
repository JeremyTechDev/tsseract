import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';

import Card from './Card';
import { iPost } from '../../@types';

axios.defaults.baseURL = 'http://localhost:8080';

const Posts = () => {
  const [posts, setPosts] = useState<iPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/posts/?limit=3');

      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <Container disableGutters maxWidth="md">
      <Typography gutterBottom variant="h2">
        Posts
      </Typography>

      {posts.map((post) => (
        <Card key={post._id} post={post} />
      ))}
    </Container>
  );
};

export default Posts;
