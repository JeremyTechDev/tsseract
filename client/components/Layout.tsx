import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Grid, Paper, makeStyles, Button } from '@material-ui/core';
import { PostAdd } from '@material-ui/icons';

import AppContext from '../context';

interface Props {
  children?: React.ReactNode;
  displayNav?: boolean;
  title: string;
}

const useStyles = makeStyles({
  header: { marginBottom: '10px' },
  logo: { height: '12vh' },
  margin: { minHeight: '100vh' },
  spacing: { margin: '0 15px' },
});

const Layout: React.FC<Props> = ({ children, title, displayNav }) => {
  const classes = useStyles();
  const {
    state: { theme },
  } = useContext(AppContext);

  return (
    <Paper className={classes.margin} square elevation={0}>
      <Head>
        <title>{title}</title>
      </Head>

      {displayNav && (
        <Paper className={classes.header} elevation={3} square>
          <Grid container alignItems="center" justify="space-around">
            <Grid item>
              <img
                className={classes.logo}
                src={`/Main-aside/${
                  theme === 'dark' ? 'white_' : ''
                }logo_transparent_background.png`}
                alt="Tsseract logo"
              />
            </Grid>
            <Grid />
            <Grid item>
              {/* <Button className={classes.spacing}>Log Out</Button> */}

              <Link href="create-post">
                <Button
                  className={classes.spacing}
                  color="primary"
                  endIcon={<PostAdd />}
                  variant="contained"
                >
                  Create Post
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      )}

      {children}
    </Paper>
  );
};

export default Layout;
