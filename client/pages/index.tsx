import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { Grid, Button } from '@material-ui/core';

import Layout from '../components/Layout';

const App: NextPage<{}> = () => {
  return (
    <Layout title="Tsseract App">
      <Grid container>
        <Link href="/login">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
        <Link href="/create-post">
          <Button variant="contained" color="primary">
            Write a Post
          </Button>
        </Link>
      </Grid>
    </Layout>
  );
};

export default App;
