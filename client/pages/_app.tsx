import React from 'react';
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

const App: React.FC<Props> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
