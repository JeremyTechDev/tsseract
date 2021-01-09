import React from 'react';
import { Box } from '@material-ui/core';

import useStyles from './styles';

interface Props {
  backgroundColor: string;
}

const Color: React.FC<Props> = ({ backgroundColor }) => {
  const classes = useStyles();

  return <Box style={{ backgroundColor }} className={classes.bubbleColor} />;
};

export default Color;
