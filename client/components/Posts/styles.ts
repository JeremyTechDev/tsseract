import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  coverContainer: {
    position: 'relative',
    margin: '0 auto',
    padding: 0,
  },
  coverImg: {
    width: '100%',
    verticalAlign: 'middle',
  },
  coverContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    background:
      'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.7) 100%)',
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
});

export default useStyles;
