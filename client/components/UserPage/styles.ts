import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  user: {
    left: '15%',
    position: 'fixed',
    top: '14vh',
  },
  userCard: {
    margin: 5,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: theme.spacing(15),
    width: theme.spacing(15),
  },
  divider: {
    margin: '15px auto',
  },
}));

export default styles;
