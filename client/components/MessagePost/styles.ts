import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    width: '60%',
    margin: '10px 0',
    [theme.breakpoints.down('md')]: {
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
