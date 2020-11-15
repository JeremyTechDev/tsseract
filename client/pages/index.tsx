import React from 'react';
import { NextPage } from 'next';
import { Grid, Button } from '@material-ui/core';
import Link from 'next/link';

import Layout from '../components/Layout';

const App: NextPage<{}> = () => {
  return (
    <Layout title="Tsseract App" displayFooter displayNav>
      <Grid container>
        <Link href="/posts">
          <Button variant="contained" color="primary">
            Go to /posts
          </Button>
        </Link>
      </Grid>
    </Layout>
  );
};

export default App;
