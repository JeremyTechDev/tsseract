import Image from 'next/image';
import { Box, Typography, Button, Grid, Theme, Link } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    margin: 0,
  },
  title: {
    fontWeight: 900,
    fontFamily: 'Source Code Pro',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    background: 'linear-gradient(268deg, #d2afff, #a3adff)',
  },
  section: {
    width: '50vw',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: '50vh',
    },
  },
}));

const ComingSoonPage = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={12}
        md={6}
        container
        className={classes.section}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Typography align="center" className={classes.title} variant="h1">
          Coming
          <br />
          Soon!
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        container
        className={`gradient--background ${classes.section}`}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Link href="/home">
            <Image
              alt="Tsseract logo"
              height={120}
              objectFit="contain"
              priority
              src="/Main-aside/dark_logo_transparent_background.png"
              width={320}
            />
          </Link>
        </Grid>

        <Grid item>
          <Box margin="0 1rem">
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              Still working on some of the coolest features...
            </Typography>
          </Box>
        </Grid>

        <Grid item container justifyContent="center" spacing={1}>
          <Grid item>
            <Button href="/home" variant="outlined" color="info">
              Go back home
            </Button>
          </Grid>
          <Grid item>
            <Button href="/#contribute" variant="outlined" color="info">
              I wanna contribute!
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ComingSoonPage;
