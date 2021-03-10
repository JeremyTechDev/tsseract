import {
  CardActionArea,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import isURL from 'is-url';

import useStyles from './styles';
import PostInfo from './PostInfo';
import Tag from './Tag';
import { iPost, iTag } from '../../@types';

interface Props {
  post: iPost;
}

const Card: React.FC<Props> = ({ post }: Props) => {
  const classes = useStyles();
  const { cover, user, title, createdAt, tags, _id, interactions } = post;

  return (
    <Paper className={classes.paper} elevation={5}>
      <CardActionArea>
        <Link href={`/post/${_id}`}>
          {(isURL(cover) && (
            <Container className={classes.coverContainer}>
              <img className={classes.coverImg} src={cover} alt={title} />

              <Grid
                container
                justify="flex-start"
                alignItems="flex-end"
                className={classes.coverContent}
              >
                <PostInfo user={user} title={title} createdAt={createdAt} />
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
        alignItems="center"
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

        {interactions ? (
          <Grid item>
            <Typography variant="overline">
              {`${interactions} ${
                interactions === 1 ? 'interaction' : 'interactions'
              }`}
            </Typography>
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  );
};

export default Card;
