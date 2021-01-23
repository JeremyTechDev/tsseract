import React, { useState, useEffect, useReducer } from 'react';
import App from 'next/app';
import NextProgress from 'nextjs-progressbar';
import {
  CssBaseline,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core';
import type { AppContext as iAppContext } from 'next/app';

import AppContext, { Types } from '../context';
import getTheme from '../theme';
import initialState from '../context/state';
import reducer from '../context/reducer';
import { getRequest } from '../lib/fetch';
import { iUser } from '../@types';

type Theme = 'light' | 'dark';
interface Props {
  Component: React.FC;
  pageProps: object;
  authData: iUser | null;
}

const MyApp = ({ Component, pageProps, authData }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState(authData));
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  useEffect(() => {
    const theme: Theme = (localStorage.getItem('theme') as Theme) || 'dark';

    setCurrentTheme(theme);
    dispatch({ type: Types.SET_THEME, payload: theme });

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={responsiveFontSizes(getTheme(currentTheme))}>
      <CssBaseline />
      <NextProgress
        color={getTheme(currentTheme).palette.secondary.main}
        options={{ showSpinner: false }}
      />
      <AppContext.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
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
