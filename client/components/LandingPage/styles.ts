import { makeStyles, Theme } from '@material-ui/core';

const styles = makeStyles((theme: Theme) => ({
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
      'radial-gradient(ellipse at center, rgba(250,250,250,0) 21%,rgba(250,250,250,0.7) 42%,rgba(250,250,250,1) 60%), url("/memoji-square.png")',
    width: 500,
    height: 500,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 300,
    },
  },
  tweets: {
    width: '100vw',
    overflowX: 'scroll',
    marginBottom: '2rem',
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
}));

export default styles;
