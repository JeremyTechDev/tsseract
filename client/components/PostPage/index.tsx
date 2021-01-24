import React, { useState, createRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link as MuiLink,
  Typography,
} from '@material-ui/core';
import {
  Comment as CommentIcon,
  Favorite as Liked,
  FavoriteBorder as NotLiked,
} from '@material-ui/icons';

import { iPost, iTag } from '../../@types';
import { putRequest, deleteRequest } from '../../lib/fetch';
import Avatar from '../Avatar/Avatar';
import Comment from './Comment';
import CommentBox from './CommentBox';
import parseDate from '../../helpers/parseDate';
import RichTextEditor from '../RichTextEditor';
import Tag from '../PostsList/Tag';
import useStyles from './styles';

interface Props {
  post: iPost;
  isSelfPost: boolean;
  isLikedProp: boolean | null;
}

const PostPage: React.FC<Props> = ({ post, isSelfPost, isLikedProp }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post.comments);
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likes, setLikes] = useState(post.likes);
  const commentBoxRef = createRef<HTMLTextAreaElement>();
  const { _id, body, cover, createdAt, tags, title, user, interactions } = post;

  const toggleLike = () => {
    putRequest(`/posts/like/${_id}`)
      .then(() => {
        if (isLiked) {
          setLikes((prev) => prev.splice(0, 1));
        } else {
          setLikes((prev) => ['authUser', ...prev]);
        }
        setIsLiked((prev) => !prev);
      })
      .catch((err) => console.error(err));
  };

  const deletePost = () => {
    const confirmation = confirm(
      'Are you sure you want to delete this post?\nYou cannot undo this action',
    );

    if (confirmation) {
      deleteRequest(`/posts/${post._id}`)
        .then((res) => {
          if (res.status === 200) {
            Router.replace('/posts');
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container className={classes.root} maxWidth="md">
      {cover && <img src={cover} alt={title} className={classes.img} />}

      <Typography variant="h1" paragraph>
        {title}
      </Typography>

      <Grid container justify="space-between">
        <Grid item>
          <Link href={`/profile/${user._id}`}>
            <MuiLink color="textPrimary" variant="subtitle1">
              <Grid container spacing={2} alignItems="center">
                <Avatar avatar={user.avatar} />
                <Grid item>{user.name}</Grid>
              </Grid>
            </MuiLink>
          </Link>
        </Grid>

        <Grid item>
          <Typography variant="subtitle2">{parseDate(createdAt)}</Typography>
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Grid item xs={12} sm={6} className={classes.commentBody}>
          <Grid container>
            {tags.map((tag: iTag) => (
              <Tag key={tag._id} tag={tag} />
            ))}
          </Grid>
        </Grid>

        <Grid>
          <IconButton
            onClick={toggleLike}
            title={isLiked ? 'Unlike' : 'Like'}
            color="primary"
          >
            <Badge badgeContent={likes.length} color="primary">
              {isLiked ? <Liked /> : <NotLiked />}
            </Badge>
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => commentBoxRef.current?.focus()}
            title="Add Comment"
          >
            <Badge badgeContent={comments.length} color="primary">
              <CommentIcon />
            </Badge>
          </IconButton>
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Typography variant="overline">
          {`${interactions} ${
            interactions === 1 ? 'interaction' : 'interactions'
          }`}
        </Typography>

        {isSelfPost && (
          <Button onClick={deletePost} color="primary">
            Delete Post
          </Button>
        )}
      </Grid>

      <Divider light className={classes.divider} />

      <RichTextEditor readOnly value={JSON.parse(body)} />

      <Divider className={classes.divider} light />

      <Typography variant="h3" paragraph>
        Discussion
      </Typography>

      <CommentBox ref={commentBoxRef} post={post} setComments={setComments} />

      {comments.length !== 0 ? (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        <Typography className={classes.divider} variant="body1" align="center">
          Be the first one to comment!
        </Typography>
      )}
    </Container>
  );
};

export default PostPage;
