import { makeStyles } from '@material-ui/core';

interface Props {
  bg?: string;
  color?: string;
}

const useStyles = makeStyles({
  margin: { margin: 5 },
  grid: {
    backgroundImage: ({ bg }: Props) => `url(${bg})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    minWidth: '100%',
  },
  centered: {
    left: '50%',
    position: 'fixed',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  imgInfo: {
    backgroundColor: '#000',
    borderRadius: 4,
    color: '#fff',
    margin: 5,
    opacity: 0.8,
    padding: 10,
  },
});

export default useStyles;
