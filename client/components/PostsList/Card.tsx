import React from 'react';
import {
  Badge,
  IconButton,
  CardActionArea,
  Container,
  Grid,
  Paper,
} from '@material-ui/core';
import { Favorite as Like, Comment } from '@material-ui/icons';
import Link from 'next/link';

import useStyles from './styles';
import PostInfo from './PostInfo';
import Tag from './Tag';
import { iPost, iTag } from '../../@types';

interface Props {
  post: iPost;
}

const Card: React.FC<Props> = ({ post }: Props) => {
  const classes = useStyles();
  const { cover, user, title, comments, createdAt, likes, tags, _id } = post;

  return (
    <Paper className={classes.paper} elevation={5}>
      <CardActionArea>
        <Link href={`/post/${_id}`}>
          {(cover && (
            <Container className={classes.coverContainer}>
              <img className={classes.coverImg} src={cover} alt={title} />

              <Grid
                container
                justify="flex-start"
                alignItems="flex-end"
                className={classes.coverContent}
              >
                <Grid item className={classes.padding}>
                  <PostInfo user={user} title={title} createdAt={createdAt} />
                </Grid>
              </Grid>
            </Container>
          )) || (
            <Container className={classes.padding}>
              <PostInfo user={user} title={title} createdAt={createdAt} />
            </Container>
          )}
        </Link>
      </CardActionArea>

      <Grid
        className={classes.contentBtns}
        container
        justify="space-between"
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <Grid container>
            {tags.map((tag: iTag) => (
              <Tag key={tag._id} tag={tag} />
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} container justify="flex-end">
          <Link href={`/post/${_id}`}>
            <IconButton title="Like" className={classes.btn} color="primary">
              <Badge badgeContent={likes.length} color="primary">
                <Like />
              </Badge>
            </IconButton>
          </Link>

          <Link href={`/post/${_id}`}>
            <IconButton
              className={classes.btn}
              color="primary"
              title="Add Comment"
            >
              <Badge badgeContent={comments.length} color="primary">
                <Comment />
              </Badge>
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
