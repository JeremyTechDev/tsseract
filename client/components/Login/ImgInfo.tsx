import React from 'react';
import { Paper, Typography, Link } from '@material-ui/core';

import useStyles from './styles';

interface Props {
  children?: React.ReactNode;
  bgData: {
    color?: string;
    description?: string;
    img: string;
    link?: string;
    name?: string;
    raw?: string;
  };
}

const ImgInfo: React.FC<Props> = ({ bgData }) => {
  const { color, name, link, description } = bgData;
  const classes = useStyles({ color });

  return name ? (
    <Paper className={classes.imgInfo}>
      {description && (
        <Typography align="right" variant="subtitle1">
          {description.toUpperCase()}
        </Typography>
      )}
      {name && (
        <Typography align="right" variant="subtitle2">
          by {(link && <Link href={link!}>{name}</Link>) || name}
        </Typography>
      )}
    </Paper>
  ) : null;
};

export default ImgInfo;
