import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  margin: {
    margin: 10,
  },
  padding: {
    padding: 10,
  },
  titleTextArea: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontFamily: 'Playfair Display',
    fontSize: 35,
    fontWeight: 500,
    margin: '10px 10px 0',
    resize: 'none',
    width: 'calc(100% - 15px)',
  },
  bodyTextArea: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: 20,
    fontWeight: 500,
    margin: '10px',
    resize: 'none',
    width: 'calc(100% - 15px)',
  },
  coverImg: {
    display: 'block',
    margin: '5px auto',
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: 4,
  },
});

export default useStyles;
