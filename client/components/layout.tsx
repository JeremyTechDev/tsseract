import React from 'react';
import Head from 'next/head';
import { Paper } from '@material-ui/core';

interface Props {
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => (
  <Paper square elevation={0}>
    <Head>
      <title>{title}</title>
    </Head>

    {children}
  </Paper>
);

export default Layout;
