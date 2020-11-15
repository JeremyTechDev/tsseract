import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { PostAdd } from '@material-ui/icons';

import AppContext from '../../context';

interface Props {
  children?: React.ReactNode;
  displayFooter?: boolean;
  displayNav?: boolean;
  title: string;
}

import useStyles from './styles';

const Layout: React.FC<Props> = ({
  children,
  displayFooter,
  displayNav,
  title,
}) => {
  const classes = useStyles();
  const {
    state: { theme },
  } = useContext(AppContext);

  const logo = `/Main-aside/${
    theme === 'dark' && 'white_'
  }logo_transparent_background.png`;

  return (
    <Paper className={classes.margin} square elevation={0}>
      <Head>
        <title>{title}</title>
      </Head>

      {displayNav && (
        <Paper className={classes.header} elevation={3} square>
          <Grid container alignItems="center" justify="space-around">
            <Link href="/posts">
              <img className={classes.logo} src={logo} alt="Tsseract logo" />
            </Link>
            <Grid />
            <Grid item>
              {/* <Button className={classes.spacing}>Log Out</Button> */}

              <Link href="/create-post">
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

      <div className={classes.contentWrap}>{children}</div>

      {displayFooter && (
        <Paper elevation={10} square className={classes.footer}>
          <Grid container justify="center" alignItems="center">
            <Typography
              align="center"
              className={classes.footerText}
              variant="h1"
            >
              Tsseract
            </Typography>
          </Grid>
        </Paper>
      )}
    </Paper>
  );
};

export default Layout;
