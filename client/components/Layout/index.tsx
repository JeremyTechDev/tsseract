import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Grid,
  Paper,
  Button,
  Typography,
  Link as MuiLink,
  Box,
  IconButton,
} from '@material-ui/core';
import {
  AlternateEmail,
  Face,
  GitHub,
  Favorite as Heart,
  LinkedIn,
  PostAdd,
} from '@material-ui/icons';

import AppContext, { Types } from '../../context';
import useStyles from './styles';
import { logoutUser } from '../../lib/auth';

interface Props {
  children?: React.ReactNode;
  displayFooter?: boolean;
  displayNav?: boolean;
  title?: string;
}

const Layout: React.FC<Props> = ({
  children,
  displayFooter = true,
  displayNav = true,
  title = 'Tsseract',
}) => {
  const classes = useStyles();
  const {
    state: { theme, isAuthenticated, user },
    dispatch,
  } = useContext(AppContext);

  const logo = `/Main-aside/${
    theme === 'dark' ? 'white_' : ''
  }logo_transparent_background.png`;

  const handleLogOut = () => {
    dispatch({ type: Types.SET_CREDENTIALS, payload: null });
    logoutUser();
  };

  return (
    <Paper className={classes.margin} square elevation={0}>
      <Head>
        <title>{title}</title>
      </Head>

      {displayNav && (
        <Paper className={classes.header} elevation={3} square>
          <Grid container alignItems="center" justify="space-around">
            <Link href={isAuthenticated ? '/posts' : '/'}>
              <img className={classes.logo} src={logo} alt="Tsseract logo" />
            </Link>
            <Grid />
            <Grid item>
              {!isAuthenticated ? (
                <Link href="/login">
                  <Button className={classes.spacing}>Log In</Button>
                </Link>
              ) : (
                <React.Fragment>
                  <Button onClick={handleLogOut} className={classes.spacing}>
                    Log Out
                  </Button>
                  <Link href={`/profile/${user?.username}`}>
                    <Button
                      color="primary"
                      endIcon={<Face />}
                      variant="contained"
                    >
                      Profile
                    </Button>
                  </Link>
                </React.Fragment>
              )}

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
        <Box className={classes.footer}>
          <Paper elevation={20} square>
            <Grid container justify="center" alignItems="center">
              <Grid className={classes.footerTop} container justify="center">
                <Grid item container justify="center" alignItems="center">
                  <IconButton
                    color="primary"
                    href="https://github.com/jeremy2918"
                  >
                    <GitHub fontSize="large" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    href="https://linkedin.com/in/jeremy-munoz-torres"
                  >
                    <LinkedIn fontSize="large" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    href="mailto:jeremy2918@gmail.com"
                  >
                    <AlternateEmail fontSize="large" />
                  </IconButton>
                </Grid>

                <Typography color="textSecondary">
                  <Link href={isAuthenticated ? '/posts' : '/'}>
                    <MuiLink color="inherit">Home</MuiLink>
                  </Link>
                  {' | '}
                  <Link href="/posts">
                    <MuiLink color="inherit">Posts</MuiLink>
                  </Link>
                  {' | '}
                  <Link href={`/profile/${user?.username}`}>
                    <MuiLink color="inherit">Profile</MuiLink>
                  </Link>
                  {' | '}
                  <Link href="/create-post">
                    <MuiLink color="inherit">Write a Post</MuiLink>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper square className={classes.footerBottom}>
            <Grid container justify="center" alignItems="center">
              <Typography variant="h5" align="center">
                Crafted with
              </Typography>
              <Heart className={classes.heart} />
              <Typography variant="h5" align="center">
                by Jeremy
              </Typography>
            </Grid>
          </Paper>
        </Box>
      )}
    </Paper>
  );
};

export default Layout;
