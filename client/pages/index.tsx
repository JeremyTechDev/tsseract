import React from 'react';
import { NextPage } from 'next';
import { Grid, Button } from '@material-ui/core';
import Link from 'next/link';

import Layout from '../components/Layout';
import { authInitialProps } from '../lib/auth';
import { authType } from '../@types';

interface Props {
  user: authType;
}

const App: NextPage<Props> = ({ user }) => {
  return (
    <Layout title="Tsseract App" authData={user} displayFooter displayNav>
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

App.getInitialProps = authInitialProps();

export default App;
