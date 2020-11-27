import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: { margin: 10 },
  padding: { padding: 10 },
  titleTextArea: {
    background: 'none',
    border: 'none',
    color: theme.palette.type === 'dark' ? '#fff' : '#000',
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
}));

export default useStyles;
