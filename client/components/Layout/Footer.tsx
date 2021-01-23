import React, { useContext } from 'react';
import Link from 'next/link';
import {
  Box,
  Grid,
  Paper,
  IconButton,
  Link as MuiLink,
  Typography,
} from '@material-ui/core';
import { GitHub, LinkedIn, AlternateEmail, Favorite } from '@material-ui/icons';

import AppContext from '../../context';
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();
  const {
    state: { isAuthenticated, user },
  } = useContext(AppContext);

  return (
    <Box className={classes.footer}>
      <Paper elevation={20} square>
        <Grid container justify="center" alignItems="center">
          <Grid className={classes.footerTop} container justify="center">
            <Grid item container justify="center" alignItems="center">
              <IconButton color="primary" href="https://github.com/jeremy2918">
                <GitHub fontSize="large" />
              </IconButton>
              <IconButton
                color="primary"
                href="https://linkedin.com/in/jeremy-munoz-torres"
              >
                <LinkedIn fontSize="large" />
              </IconButton>
              <IconButton color="primary" href="mailto:jeremy2918@gmail.com">
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
          <Favorite className={classes.heart} />
          <Typography variant="h5" align="center">
            by Jeremy
          </Typography>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Footer;
