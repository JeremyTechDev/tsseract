import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { FiberManualRecord as Dot } from '@material-ui/icons';

import useStyles from './styles';

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Container>
      <Image src="/landing.png" layout="fill" objectFit="cover" priority />

      <Grid container className={classes.control} justify="flex-end">
        <Link href="/login?view=signIn">
          <Button color="primary">Login</Button>
        </Link>
        <Link href="/login?view=signUp">
          <Button color="primary" variant="contained">
            Register
          </Button>
        </Link>
      </Grid>

      <Grid
        container
        alignItems="center"
        className={classes.mainWindow}
        justify="center"
      >
        <Paper className={classes.window}>
          <Paper className={classes.windowTop}>
            <Dot style={{ color: '#ff605c' }} />
            <Dot style={{ color: '#ffbd44' }} />
            <Dot style={{ color: '#00ca4e' }} />
          </Paper>

          <Grid
            container
            className={classes.windowContent}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography align="center" variant="h1" className={classes.title}>
              Tsseract
            </Typography>
            <Typography align="center" variant="subtitle1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Link href="/posts">
              <Button
                className={classes.btn}
                size="large"
                color="primary"
                variant="contained"
              >
                Get Started
              </Button>
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};

export default LandingPage;
