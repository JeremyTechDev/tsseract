import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from '@material-ui/core';

import theme from '../theme';
import '../../../scss/nprogress.scss';

interface Props {
  Component: React.FC;
  pageProps: object;
}

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type Theme = 'light' | 'dark';

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

  useEffect(() => {
    const newTheme: Theme = localStorage.getItem('theme') as Theme;
    if (newTheme) setCurrentTheme(newTheme);
  }, [currentTheme]);

  return (
    <ThemeProvider theme={theme(currentTheme)}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
