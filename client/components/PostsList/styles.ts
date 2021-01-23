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
    background:
      'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.7) 100%)',
    bottom: 0,
    left: 0,
    padding: 20,
    position: 'absolute',
    top: 0,
  },
  fontColor: {
    color: '#fff',
  },
  padding: {
    padding: 20,
  },
  contentBtns: {
    padding: 10,
  },
  paper: {
    margin: '15px auto',
    minHeight: 250,
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
});

export default useStyles;
