import { Theme } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

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
      'radial-gradient(ellipse at center, rgba(255,255,255,0) 21%,rgba(255,255,255,0.7) 42%,rgba(255,255,255,1) 60%), url("/memoji-square.png")',
    width: 500,
    height: 500,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    [theme.breakpoints.down('md')]: {
      width: 300,
      height: 300,
    },
  },
  tweets: {
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: '5px repeat(7, calc(30vw - 40px)) 5px',
    marginBottom: '2rem',
    overflowX: 'scroll',
    overflowY: 'hidden',
    width: '100vw',
    '&::before': { content: '""' },
    '&::after': { content: '""' },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '5px repeat(7, calc(70vw - 40px)) 5px',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '5px repeat(7, calc(90vw - 40px)) 5px',
    },
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
