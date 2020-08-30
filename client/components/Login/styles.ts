import { makeStyles } from '@material-ui/core';

interface Props {
  bg: string;
}

const useStyles = makeStyles({
  container: {
    backgroundImage: ({ bg }: Props) => `url(${bg})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    minWidth: '100%',
    position: 'fixed',
  },
});

export default useStyles;
