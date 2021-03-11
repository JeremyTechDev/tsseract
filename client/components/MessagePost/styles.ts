import { makeStyles, Theme } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: '60%',
    background: theme.palette.primary.main,
  },
  imgContainer: {
    height: 350,
    position: 'relative',
    width: '100%',
  },
}));

export default styles;
