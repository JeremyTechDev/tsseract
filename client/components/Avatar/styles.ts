import makeStyles from '@mui/styles/makeStyles';

const styles = makeStyles(
  (theme) => ({
    boxColor: {
      backgroundColor: theme.palette.grey[600],
      height: '60vh',
      overflowY: 'auto',
    },
    bubbleColor: {
      width: 75,
      height: 75,
      borderRadius: '50%',
    },
    margin: { margin: 10 },
  }),
  { index: 1 },
);

export default styles;
