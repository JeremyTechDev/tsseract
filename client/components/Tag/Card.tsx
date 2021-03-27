import { FC } from 'react';
import {
  Chip,
  Typography,
  Avatar,
  Grid,
  Box,
  CardActionArea,
} from '@material-ui/core';

import { iTag, iPost } from '../../@types';
import { getTagColor } from './getTagColor';
import useStyles from './styles';

interface Props {
  tag: { tag: iTag; post: iPost };
}

const TagCard: FC<Props> = ({ tag }) => {
  const classes = useStyles();

  return (
    <CardActionArea>
      <Box overflow="hidden" className={classes.card}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={2}>
            <Avatar style={{ ...getTagColor(tag.tag.name) }} variant="rounded">
              {tag.tag.name[0].toUpperCase()}
            </Avatar>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h6">{tag.tag.name}</Typography>
            <Typography variant="subtitle2" noWrap>
              {tag.post.title.substr(0, 25).trim()}...
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Chip color="secondary" label={tag.tag.popularity} />
          </Grid>
        </Grid>
      </Box>
    </CardActionArea>
  );
};

export default TagCard;
