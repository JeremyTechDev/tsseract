import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(
  ({ palette, breakpoints }) => {
    const gradient = `-webkit-linear-gradient(top right, ${palette.primary.main}, ${palette.secondary.main})`;

    return {
      img: {
        height: '100vh',
        left: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 0,
      },
      mainWindow: {
        height: '70vh',
        minWidth: '100%',
        position: 'relative',
        top: 80,
      },
      control: {
        position: 'absolute',
        right: 50,
        top: 50,
      },
      window: {
        background: 'transparent',
        border: '2px solid #181818',
        borderRadius: 4,
        width: '55%',
        [breakpoints.down('md')]: {
          width: '100%',
        },
      },
      windowTop: {
        background: 'transparent',
        border: '2px solid #181818',
        borderRadius: '4px 4px 0 0',
        height: 25,
        margin: -2,
        width: 'calc(100% + 4px)',
      },
      title: {
        backgroundImage: gradient,
        fontWeight: 900,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        [breakpoints.down('sm')]: {
          fontSize: 50,
        },
      },
      windowContent: {
        color: '#252525',
        height: 'calc(90% - 25px)',
        padding: 50,
        width: '100%',
        [breakpoints.down('sm')]: {
          padding: 20,
        },
      },
      btn: {
        marginTop: 30,
      },
    };
  },
  { index: 1 },
);

export default styles;
