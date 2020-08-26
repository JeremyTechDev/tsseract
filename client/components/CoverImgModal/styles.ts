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
    alignItems: 'center',
    display: 'flex',
    marginTop: 10,
    padding: 0,
  },
  btnBox: {
    marginLeft: 'auto',
  },
  txtBox: {
    margin: '-5px auto 0 0',
  },
  paper: {
    padding: 20,
  },
});

export default useStyles;
