import React, { useState, useEffect, useReducer } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from '@material-ui/core';

import AppContext, { Types } from '../context';
import initialState from '../context/state';
import reducer from '../context/reducer';
import theme from '../theme';
import useFetch from '../hooks/useFetch';
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

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const { handleFetch } = useFetch('/api/auth/', 'POST');

  useEffect(() => {
    const newTheme: Theme = localStorage.getItem('theme') as Theme;
    if (newTheme) setCurrentTheme(newTheme);

    const fetchAuthData = async (authToken: string) => {
      const res = await handleFetch({}, { 'tsseract-auth-token': authToken });

      if (res?.response.ok) {
        const { name, username, email, _id: id } = res.data.data;

        dispatch({
          type: Types.SET_AUTH_TOKEN,
          payload: {
            authToken,
            user: { name, username, email, id },
          },
        });
      }
    };

    const authToken = localStorage.getItem('tsseract-auth-token');
    if (authToken) fetchAuthData(authToken);
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
