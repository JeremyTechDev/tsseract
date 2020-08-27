import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: { margin: 10 },
  padding: { padding: 10 },
  titleTextArea: {
    background: 'none',
    border: 'none',
    fontFamily: 'Playfair Display',
    fontSize: 35,
    fontWeight: 500,
    margin: '10px 10px 0',
    resize: 'none',
    width: 'calc(100% - 15px)',
    color: theme.palette.type === 'dark' ? '#fff' : '#000',
  },
  bodyTextArea: {
    background: 'none',
    border: 'none',
    color: theme.palette.type === 'dark' ? '#fff' : '#000',
    fontSize: 20,
    fontWeight: 500,
    margin: '10px',
    resize: 'none',
    width: 'calc(100% - 15px)',
  },
  coverImg: {
    borderRadius: 4,
    display: 'block',
    height: '50vh',
    margin: '5px auto',
    objectFit: 'cover',
    width: '100%',
  },
  currImgInput: {
    margin: 10,
    [theme.breakpoints.down('md')]: {},
  },
}));

export default useStyles;
