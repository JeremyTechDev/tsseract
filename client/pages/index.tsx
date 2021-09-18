import {
  Box,
  Container,
  Button,
  Grid,
  Link,
  Paper,
  Theme,
  Typography,
  IconButton,
} from '@material-ui/core';

import Dot from '@material-ui/icons/FiberManualRecord';
import BoxIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckedBoxIcon from '@material-ui/icons/CheckBox';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import { makeStyles } from '@material-ui/styles';

const LINKS = [
  { Icon: TwitterIcon, title: 'Twitter', link: 'https://twitter.com/askjere' },
  {
    Icon: GitHubIcon,
    title: 'GitHub Repo',
    link: 'https://github.com/jeremy2918',
  },
  {
    Icon: LinkedInIcon,
    title: "Jeremy's CV",
    link: 'https://www.linkedin.com/in/askjere/',
  },
];

const TODO = [
  { text: 'Chat-like interface', checked: true },
  { text: 'Cool avatars picker', checked: false },
  { text: 'Meta tags for Twitter', checked: true },
  { text: 'Monetization 💸', checked: false },
  { text: 'Published 🚀', checked: true },
  { text: 'Richest text-editor', checked: false },
  { text: 'Share on Twitter', checked: false },
  { text: 'Sick lading page', checked: true },
  { text: 'User accounts', checked: false },
  { text: 'User engagement features', checked: true },
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
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
    color: 'inherit',
  },
  memoji: {
    backgroundImage:
      'radial-gradient(ellipse at center, rgba(255,255,255,0) 21%,rgba(255,255,255,0.7) 42%,rgba(255,255,255,1) 60%), url("/memoji-square.png")',
    width: 500,
    height: 500,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
  },
  forYouTo: {
    color: theme.palette.grey[700],
  },
  inspire: {
    color: theme.palette.primary.main,
  },
  codeFont: {
    fontFamily: 'Source Code Pro',
  },
  footer: {
    backgroundImage: `#d2afff;background-image:  
    radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0, transparent 50%),  
    radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0, transparent 50%),  
    radial-gradient(at 0% 50%, hsla(355,85%,93%,1) 0, transparent 50%),  
    radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0, transparent 50%),  
    radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0, transparent 50%),  
    radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0, transparent 50%),  
    radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0, transparent 50%)`,
    color: theme.palette.common.white,
    marginTop: '4rem',
    padding: 50,
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Box>
      <Grid
        alignItems="center"
        className={classes.container}
        container
        justifyContent="center"
      >
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
                  Tsseract is home for every idea, script or thought you want to
                  share.
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

      <Grid item>
        <Box padding="8rem 2rem">
          <Container maxWidth="lg">
            <Grid container alignItems="center">
              <Grid item xs={12} md={6} container direction="column">
                <Grid item>
                  <Typography variant="h1">Tsseract</Typography>
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
                    create, build, publish, share, comment, like, construct,
                    code, engage, deign, help, greet,
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

      <Grid item>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={false} md={1} />

            <Grid item xs={12} md={5}>
              <Paper elevation={10} className={classes.window}>
                <Typography variant="h3" paragraph className={classes.codeFont}>
                  Do you Open Source?
                </Typography>

                <Typography
                  variant="subtitle1"
                  paragraph
                  className={classes.codeFont}
                >
                  Even if you are just starting, take a look at{' '}
                  <Link>the repo</Link> and just open a pull request!
                </Typography>

                <Typography
                  variant="subtitle1"
                  paragraph
                  className={classes.codeFont}
                >
                  There might already be an issue or two that you can handle.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                className={classes.codeFont}
                gutterBottom
              >
                /* TODO: */
              </Typography>

              <Grid container>
                {TODO.map(({ text, checked }) => (
                  <Grid item key={text} container>
                    <Grid item>
                      {checked ? (
                        <CheckedBoxIcon fontSize="large" />
                      ) : (
                        <BoxIcon fontSize="large" />
                      )}
                    </Grid>

                    <Grid item>
                      <Typography className={classes.codeFont} variant="h6">
                        {text}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <footer className={classes.footer}>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h2">again, Tsseract</Typography>

          <Typography variant="h4" paragraph>
            crafted with ♥️ by{' '}
            <Link color="textSecondary" href="https://twitter.com/askjere">
              @AskJere
            </Link>
          </Typography>

          <Typography variant="h4" paragraph>
            <Link color='textSecondary' href="mailto:jeremy2918@gmail.com">jeremy2918@gmail.com</Link>
          </Typography>

          <Grid item container spacing={2} justifyContent="center">
            {LINKS.map(({ Icon, title, link }) => (
              <Grid item key={link}>
                <IconButton title={title} color="inherit" href={link}>
                  <Icon fontSize="large" />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </footer>
    </Box>
  );
};

export default LandingPage;
