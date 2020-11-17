import React, { useState, useEffect, useReducer } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from '@material-ui/core';

import AppContext, { Types } from '../context';
import getTheme from '../theme';
import initialState from '../context/state';
import reducer from '../context/reducer';
import '../../../scss/nprogress.scss';

type Theme = 'light' | 'dark';
interface Props {
  Component?: React.FC;
  pageProps?: object;
}

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App: NextPage<Props> = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  useEffect(() => {
    const theme: Theme = (localStorage.getItem('theme') as Theme) || 'dark';

    setCurrentTheme(theme);
    dispatch({ type: Types.SET_THEME, payload: theme });

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={getTheme(currentTheme)}>
      <AppContext.Provider value={{ state, dispatch }}>
        {Component && <Component {...pageProps} />}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
