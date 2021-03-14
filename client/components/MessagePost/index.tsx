import Image from 'next/image';
import {
  Card,
  Link,
  Box,
  Grid,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import router from 'next/router';
import { NextPage } from 'next';

import Avatar from '../Avatar/Avatar';
import Tag from '../Tag';
import useStyles from './styles';
import timeAgo from '../../helpers/timeAgo';
import theme from '../../theme';
import { iPost } from '../../@types';

interface Props {
  post: iPost;
  out: boolean;
}

const getStyles = (out: boolean) => {
  const pallete = theme('dark').palette;

  return {
    alignSelf: out ? 'end' : 'start',
    background: out ? pallete.primary.main : pallete.grey[700],
    borderRadius: out ? '20px 0 20px 20px' : '0 20px 20px 20px',
    margin: out ? '20px 30px' : '5px 30px',
  };
};

/**
 * Message that represents a post
 * @param {object} post The post data
 * @param {boolean} out True if the post was published by the authenticated user
 */
const Received: NextPage<Props> = ({ post, out }) => {
  const classes = useStyles();
  const { title, user, tags, cover, interactions, createdAt, _id } = post;

  return (
    <Card className={classes.root} style={getStyles(out)}>
      <CardContent>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Grid container alignItems="center">
              <Avatar size="95px" avatar={user.avatar} />

              <Grid item>
                <Link href={`/profile/${user.username}`} color="inherit">
                  <Typography variant="h5">{user.name}</Typography>
                </Link>

                <Link href={`/profile/${user.username}`} color="inherit">
                  <Typography variant="subtitle1">@{user.username}</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>{timeAgo.format(new Date(createdAt))}</Grid>
        </Grid>
      </CardContent>

      <CardActionArea onClick={() => router.push(`/post/${_id}`)}>
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
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            {tags.map((tag) => (
              <Tag key={tag._id} tag={tag} />
            ))}
          </Grid>

          {!!interactions && (
            <Grid item>
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

export default Received;
