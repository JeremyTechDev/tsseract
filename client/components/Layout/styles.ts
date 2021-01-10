import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  header: { marginBottom: '10px' },
  logo: { height: '12vh' },
  margin: { minHeight: '100vh' },
  spacing: { margin: '0 15px' },
  contentWrap: { paddingBottom: '25vh' },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerTop: { padding: '30px 0' },
  footerBottom: {
    background: theme.palette.primary.main,
    padding: '15px 0',
  },
  heart: { margin: '0 8px' },
}));

export default styles;
