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

      {posts.length !== 0 ? (
        posts.map((post) => <Card key={post._id} post={post} />)
      ) : (
        <Typography align="center" variant="subtitle1">
          There are no posts on you feed right now
        </Typography>
      )}
    </Container>
  );
};

export default Posts;
