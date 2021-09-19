import makeStyles from '@mui/styles/makeStyles';

const styles = makeStyles((theme) => ({
  root: {
    width: '60%',
    margin: '10px 0',
    [theme.breakpoints.down('lg')]: {
      width: '90%',
    },
  },
  imgContainer: {
    height: 350,
    position: 'relative',
    width: '100%',
  },
}));

export default styles;
