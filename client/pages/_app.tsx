import React, { useState, useEffect, useReducer } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from '@material-ui/core';

import AppContext, { Types } from '../context';
import { getUserProfile } from '../lib/auth';
import initialState from '../context/state';
import reducer from '../context/reducer';
import theme from '../theme';
import '../../../scss/nprogress.scss';

type Theme = 'light' | 'dark';
interface Props {
  Component: React.FC;
  pageProps: object;
}

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App: NextPage<Props> = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

  useEffect(() => {
    const newTheme: Theme = localStorage.getItem('theme') as Theme;
    if (newTheme) {
      setCurrentTheme(newTheme);
      dispatch({ type: Types.SET_THEME, payload: newTheme });
    }

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const fetchAuthData = async () => {
      const data = await getUserProfile();
      if (data && data._id) {
        dispatch({
          type: Types.SET_CREDENTIALS,
          payload: data,
        });
      }
    };

    fetchAuthData();
  }, [currentTheme]);

  return (
    <ThemeProvider theme={theme(currentTheme)}>
      <AppContext.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
