import { createTheme } from '@material-ui/core/styles';

const theme = (theme: 'light' | 'dark') =>
  createTheme({
    mixins: {
      toolbar: { minHeight: 80 },
    },
    palette: {
      type: theme,
      primary: {
        dark: '#b60000',
        light: '#ff734c',
        main: '#f13c20',
      },
      secondary: {
        dark: '#002e72',
        light: '#7282d3',
        main: '#4056a1',
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
