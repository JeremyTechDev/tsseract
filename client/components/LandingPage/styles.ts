import { makeStyles } from '@material-ui/core';

const styles = makeStyles(({ palette, breakpoints }) => {
  const gradient = `-webkit-linear-gradient(top right, ${palette.primary.main}, ${palette.secondary.main})`;
  const background =
    'url(https://www.curtisdavid.com/wp-content/uploads/2014/12/shot1.png)';

  return {
    root: {
      background,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '100vh',
      minWidth: '100%',
      overflow: 'hidden',
      position: 'fixed',
    },
    mainWindow: {
      height: '70vh',
      minWidth: '100%',
    },
    control: {
      margin: '35px 40px 35px 0',
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
});

export default styles;
