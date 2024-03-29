import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(
  (theme) => ({
    margin: { margin: 10 },
    padding: { padding: 10 },
    titleTextArea: {
      background: 'none',
      border: 'none',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      fontFamily: 'Playfair Display',
      fontSize: 35,
      fontWeight: 500,
      margin: '10px 10px 0',
      resize: 'none',
      width: 'calc(100% - 15px)',
    },
    coverImg: {
      borderRadius: '4px 4px 0 0',
      objectFit: 'cover',
      width: '100%',
    },
    richEditor: {
      padding: '10px 8px 50px',
    },
    tagInput: {
      border: 'none',
      padding: 10,
    },
  }),
  { index: 1 },
);

export default useStyles;
