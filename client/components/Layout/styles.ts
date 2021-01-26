import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => {
  return {
    header: { display: 'block', marginBottom: '13vh' },
    margin: { minHeight: '100vh' },
    spacing: { margin: '0 15px' },
    contentWrap: (spaceUp = true) => ({
      paddingBottom: '30vh',
      paddingTop: spaceUp ? '13vh' : '0',
    }),
    footer: {
      bottom: 0,
      height: '25vh',
      position: 'absolute',
      width: '100%',
    },
    footerTop: { padding: '30px 0' },
    footerBottom: {
      background: theme.palette.primary.main,
      padding: '15px 0',
    },
    heart: { margin: '0 8px' },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    sectionMobile: {
      display: 'block',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  };
});

export default styles;
