import React from 'react';

import { iPost } from '../../@types';

interface Props {
  post: iPost;
}

const PostPage: React.FC<Props> = ({ post }: Props) => {
  return <div>{post.body}</div>;
};

export default PostPage;
