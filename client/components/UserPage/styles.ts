import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  user: {
    position: 'fixed',
    top: 150,
    left: '15%',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    margin: '10px 0',
  },
  divider: {
    margin: '15px auto',
  },
}));

export default styles;
