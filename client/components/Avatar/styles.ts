import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  boxColor: {
    backgroundColor: theme.palette.grey[600],
    height: '60vh',
    overflowY: 'scroll',
  },
  bubbleColor: {
    width: 75,
    height: 75,
    borderRadius: '50%',
  },
}));

export default styles;
