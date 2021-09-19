import { Box, Container, Grid, Link, Typography } from '@mui/material';

import useStyles from './styles';

const Middle = () => {
  const classes = useStyles();

  return (
    <Grid item>
      <Box padding="8rem 2rem 4rem">
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={12} md={6} container direction="column">
              <Grid item>
                <Typography variant="h1" component="h2">
                  Tsseract
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="h3">
                  crafted with ♥️ by{' '}
                  <Link href="https://twitter.com/askjere">@AskJere</Link>
                </Typography>
              </Grid>

              <Grid item>
                <Typography align="center" variant="subtitle1">
                  for you to...
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="h4" className={classes.forYouTo}>
                  create, build, publish, share, comment, like, construct, code,
                  engage, deign, help, greet,
                  <strong className={classes.inspire}> inspire</strong>,
                  explore, collaborate, review, curate, showoff, express
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} className={classes.memoji} />
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

export default Middle;
