import { useEffect, useReducer } from 'react';
import App from 'next/app';
import NextProgress from 'nextjs-progressbar';
import {
  CssBaseline,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  responsiveFontSizes,
} from '@mui/material';
import type { AppContext as iAppContext } from 'next/app';

import AppContext from '../context';
import theme from '../theme';
import initialState from '../context/state';
import reducer from '../context/reducer';
import { getRequest } from '../lib/fetch';
import { iUser } from '../@types';

import '../main.css';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


interface Props {
  Component: React.FC;
  pageProps: object;
  authData: iUser | null;
}

const MyApp = ({ Component, pageProps, authData }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState(authData));

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />

        <NextProgress
          color={theme.palette.secondary.main}
          options={{ showSpinner: false }}
        />

        <AppContext.Provider value={{ state, dispatch }}>
          <Component {...pageProps} />
        </AppContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

MyApp.getInitialProps = async (appContext: iAppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const authData = await getRequest(
    // @ts-ignore
    `/auth?token=${appContext?.ctx?.req?.signedCookies?.['tsseract-auth-token']}`,
  ).then((res) => res.json());

  return { ...appProps, authData };
};

export default MyApp;
