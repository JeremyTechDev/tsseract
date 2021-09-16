import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  img: {
    height: '100vh',
    left: 0,
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    width: '100vw',
    zIndex: -1,
  },
  hero: {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    width: '100vw',
    zIndex: -1,
  },
  title: {
    padding: '80px 10px 10px 10px',
    background:
      'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(50,50,50,0.7) 66%, rgba(70,70,70,0) 100%)',
  },
});

export default useStyles;
