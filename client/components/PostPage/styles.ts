import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 7,
    paddingTop: 25,
  },
  img: {
    borderRadius: 7,
    width: '100%',
  },
  divider: { margin: '50px auto' },
  commentContainer: {
    border: '1px solid grey',
    padding: 15,
    margin: '15px auto',
    borderRadius: 4,
  },
  commentBody: { marginTop: 15 },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
}));

export default styles;
