import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  coverContainer: {
    margin: '0 auto',
    padding: 0,
    position: 'relative',
  },
  coverImg: {
    verticalAlign: 'middle',
    width: '100%',
  },
  coverContent: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    background:
      'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.7) 100%)',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
  fontColor: {
    color: theme.palette.type === 'dark' ? '#000' : '#fff',
  },
  padding: {
    padding: 20,
  },
  contentBtns: {
    padding: 10,
  },
  paper: {
    margin: '15px auto',
  },
  btn: {
    margin: '0 5px',
  },
  tag: {
    borderRadius: 2,
    color: '#fff',
    fontWeight: 900,
    margin: 2,
    padding: '2px 6px 4px',
  },
}));

export default useStyles;
