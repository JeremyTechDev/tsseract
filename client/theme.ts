import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  mixins: {
    toolbar: { minHeight: 80 },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#d2afff',
    },
    secondary: {
      main: '#A3ADFF',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    h1: {
      fontFamily: 'Playfair Display',
    },
    h2: {
      fontFamily: 'Playfair Display',
    },
    h3: {
      fontFamily: 'Playfair Display',
    },
    h4: {
      fontFamily: 'Playfair Display',
    },
    h5: {
      fontFamily: 'Playfair Display',
    },
    h6: {
      fontFamily: 'Playfair Display',
    },
    subtitle1: {
      fontFamily: 'Montserrat',
    },
    subtitle2: {
      fontFamily: 'Montserrat',
    },
  },
});

export default theme;
