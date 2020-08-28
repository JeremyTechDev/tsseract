import React from 'react';
import { Box, Typography } from '@material-ui/core';

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<Props> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
