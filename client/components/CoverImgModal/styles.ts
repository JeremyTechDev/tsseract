import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(
  {
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
      borderRadius: 4,
      display: 'block',
      height: '50vh',
      margin: '5px auto',
      objectFit: 'cover',
      width: '100%',
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
  },
  { index: 1 },
);

export default useStyles;
