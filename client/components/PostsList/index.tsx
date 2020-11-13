import React from 'react';
import { Container, Typography } from '@material-ui/core';

import Card from './Card';
import { iPost } from '../../@types';

interface Props {
  posts: iPost[];
}

const Posts: React.FC<Props> = ({ posts }: Props) => {
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
