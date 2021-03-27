import { ReactNode } from 'react';
import { Box, Grid, Button } from '@material-ui/core';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface TabItemProps {
  children: ReactNode;
  onClick: (prop: object) => void;
  text?: string;
}

export const TabItem = ({ children, onClick, text = '' }: TabItemProps) => {
  return (
    <Grid item xs={6} md={2}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button onClick={onClick}>{children}</Button>
        {text}
      </Grid>
    </Grid>
  );
};

const TabPanel = (props: TabPanelProps) => {
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
          <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
            spacing={4}
          >
            {children}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
