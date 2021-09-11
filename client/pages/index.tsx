import Link from 'next/link';
import { Box, Button, Grid, Paper, Theme, Typography } from '@material-ui/core';

import { FiberManualRecord as Dot } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: 'url("/landing.png")',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    padding: theme.spacing(8),
    width: '100vw',
  },
  window: {
    background: 'transparent',
    maxWidth: 700,
    padding: theme.spacing(2),
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Box>
      <Grid
        alignItems="center"
        container
        direction="column"
        justifyContent="space-between"
        className={classes.container}
      >
        <Grid item container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Link href="/login?view=signIn">
              <Button color="primary">Login</Button>
            </Link>
          </Grid>

          <Grid item>
            <Link href="/login?view=signUp">
              <Button color="primary" variant="contained">
                Register
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid item>
          <Paper elevation={12} className={classes.window}>
            <Grid container>
              <Grid item container>
                <Grid item>
                  <Dot style={{ color: '#ff605c' }} />
                </Grid>

                <Grid item>
                  <Dot style={{ color: '#ffbd44' }} />
                </Grid>

                <Grid item>
                  <Dot style={{ color: '#00ca4e' }} />
                </Grid>
              </Grid>

              <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Typography align="center" variant="h1">
                    Tsseract
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography align="center" variant="subtitle1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </Grid>

                <Grid item>
                  <Link href="/posts">
                    <Button size="large" color="primary" variant="contained">
                      Get Started
                    </Button>
                  </Link>
                </Grid>

                <Grid item />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item />
        <Grid item />
      </Grid>
    </Box>
  );
};

export default LandingPage;
