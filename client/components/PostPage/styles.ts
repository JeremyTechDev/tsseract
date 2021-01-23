import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 7,
    paddingTop: 25,
    paddingBottom: 25,
  },
  img: {
    borderRadius: 7,
    width: '100%',
  },
  divider: { margin: '50px auto' },
  commentBody: { marginTop: 15 },
  commentBox: {
    backgroundColor: 'transparent',
    border: '1px solid #ccc',
    borderRadius: 10,
    color: theme.palette.type === 'dark' ? '#fff' : '#000',
    fontSize: 16,
    fontWeight: 500,
    padding: 10,
    resize: 'vertical',
    width: '100%',
  },
}));

export default styles;
