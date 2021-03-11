import Image from 'next/image';
import {
  Card,
  Box,
  Grid,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { NextPage } from 'next';

import Avatar from '../Avatar/Avatar';
import Tag from '../Tag';
import useStyles from './styles';
import { iPost } from '../../@types';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-Us');

interface Props {
  post: iPost;
}

const Received: NextPage<Props> = ({ post }) => {
  const classes = useStyles();
  const { title, user, tags, cover, interactions, createdAt } = post;
  console.log(createdAt);
  return (
    <Card raised className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Grid container alignItems="center">
                <Avatar size="95px" avatar={user.avatar} />

                <Grid item>
                  <Typography variant="h5">{user.name}</Typography>
                  <Typography variant="subtitle1">@{user.username}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>{timeAgo.format(new Date(createdAt))}</Grid>
          </Grid>
        </CardContent>

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
