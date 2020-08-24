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
  modal: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    margin: 100,
  },
  coverImg: {
    display: 'block',
    margin: '5px auto',
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: 4,
  },
  modalBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 0,
    marginTop: 10,
  },
  paper: {
    padding: 20,
  },
});

export default useStyles;
