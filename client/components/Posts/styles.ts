import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
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
    margin: 2,
    padding: '2px 6px 4px',
    borderRadius: 2,
    fontWeight: 900,
  },
});

export default useStyles;
