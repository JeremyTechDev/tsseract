import React, { useState, useEffect, useReducer } from 'react';
import NextProgress from 'nextjs-progressbar';
import { NextPage } from 'next';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import AppContext, { Types } from '../context';
import getTheme from '../theme';
import initialState from '../context/state';
import reducer from '../context/reducer';
import { baseURL } from '../lib/config';

type Theme = 'light' | 'dark';
interface Props {
  Component: React.FC;
  pageProps: object;
}

const App: NextPage<Props> = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(baseURL + '/api/auth');

        if (res.status === 200) {
          const authData = await res.json();
          dispatch({ type: Types.SET_CREDENTIALS, payload: authData });
        } else {
          dispatch({ type: Types.SET_CREDENTIALS, payload: null });
        }
      } catch (error) {
        dispatch({ type: Types.SET_CREDENTIALS, payload: null });
      }
    })();

    const theme: Theme = (localStorage.getItem('theme') as Theme) || 'dark';

    setCurrentTheme(theme);
    dispatch({ type: Types.SET_THEME, payload: theme });

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={getTheme(currentTheme)}>
      <CssBaseline />
      <NextProgress
        color={getTheme(currentTheme).palette.primary.main}
        options={{ showSpinner: false }}
      />
      <AppContext.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
