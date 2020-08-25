import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  padding: {
    padding: 10,
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
