import { makeStyles } from '@material-ui/core';

interface Props {
  bg?: string;
  color?: string;
}

const useStyles = makeStyles({
  grid: {
    backgroundImage: ({ bg }: Props) => `url(${bg})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    minWidth: '100%',
    position: 'fixed',
  },
  centered: {
    left: '50%',
    position: 'fixed',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  imgInfo: {
    backgroundColor: '#000',
    color: '#fff',
    margin: 5,
    opacity: 0.7,
    padding: 10,
  },
});

export default useStyles;
