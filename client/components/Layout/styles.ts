import { makeStyles } from '@material-ui/core';

const styles = makeStyles(({ palette }) => {
  const contrastColor = palette.type === 'light' ? 'dark' : 'light';
  const gradient = `-webkit-linear-gradient(top right, ${palette.primary[contrastColor]}, ${palette.secondary[contrastColor]})`;

  return {
    header: { marginBottom: '10px' },
    logo: { height: '12vh' },
    margin: { minHeight: '100vh' },
    spacing: { margin: '0 15px' },
    contentWrap: { paddingBottom: '20vh' },
    footer: {
      bottom: 0,
      height: '20vh',
      position: 'absolute',
      width: '100%',
    },
    footerText: {
      backgroundImage: gradient,
      fontWeight: 900,
      padding: '35px 0',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  };
});

export default styles;
