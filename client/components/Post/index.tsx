import Image from 'next/image';
import {
  Card,
  Box,
  Grid,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NextPage } from 'next';

import Avatar from '../Avatar/Avatar';
import Tag from '../Tag';
import theme from '../../theme';
import useStyles from './styles';
import { iPost } from '../../@types';

dayjs.extend(relativeTime);

interface Props {
  post: iPost;
  out: boolean;
}

const getStyles = (out: boolean) => {
  const pallete = theme.palette;

  return {
    alignSelf: out ? 'flex-end' : 'flex-start',
    background: out ? pallete.secondary.light : pallete.secondary.light,
    borderRadius: out ? '20px 0 20px 20px' : '0 20px 20px 20px',
  };
};

/**
 * Message that represents a post
 * @param {object} post The post data
 * @param {boolean} out True if the post was published by the authenticated user
 */
const Post: NextPage<Props> = ({ post, out }) => {
  const classes = useStyles();
  const { title, user, tags, cover, interactions, createdAt, _id } = post;

  return (
    <Card className={classes.root} style={getStyles(out)}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container alignItems="center">
              <Avatar size="95px" avatar={user.avatar} />

              <Grid item>
                <Typography variant="h5">{user.name}</Typography>

                <Typography variant="subtitle1">@{user.username}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>{dayjs(createdAt).fromNow()}</Grid>
        </Grid>
      </CardContent>

      <CardActionArea href={`/post/${_id}`}>
        <Box component="div" className={classes.imgContainer}>
          <Image
            alt={title}
            layout="fill"
            loader={({ src }) => src}
            objectFit="cover"
            src={cover}
          />
        </Box>

        <CardContent>
          <Typography variant="h4">{title}</Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Grid
          alignItems="center"
          container
          justifyContent="space-between"
          wrap="nowrap"
        >
          <Grid item xs={12} md={10} container>
            {tags.map((tag) => (
              <Grid item>
                <Tag key={tag._id} tag={tag} />
              </Grid>
            ))}
          </Grid>

          {!!interactions && (
            <Grid item xs={12} md={2}>
              <Typography>
                {interactions}{' '}
                {interactions === 1 ? 'interaction' : 'interactions'}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Post;
