import React from 'react';
import Head from 'next/head';
import { Paper, makeStyles } from '@material-ui/core';

interface Props {
  title: string;
}

const useStyles = makeStyles({
  margin: {
    padding: '10px',
    minHeight: 'calc(100vh - 20px)',
  },
});

const Layout: React.FC<Props> = ({ children, title }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.margin} square elevation={0}>
      <Head>
        <title>{title}</title>
      </Head>

      {children}
    </Paper>
  );
};

export default Layout;
