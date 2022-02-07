import { Children } from 'react';
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import ServerStyleSheets from '@mui/styles/ServerStyleSheets';

import theme from '../theme';
import { authType } from '../@types';
import { getServerSideToken, getUserScript } from '../lib/auth';

export default class MyDocument extends Document<{ userData: authType }> {
  static async getInitialProps(ctx: DocumentContext) {
    const userData = getServerSideToken(ctx.req);

    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      userData,
      ...initialProps,
      styles: [
        ...Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    const { userData } = this.props;

    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="manifest" href="./manifest.json" />
          <link rel="icon" href="./tsseract.ico" />
          <link rel="apple-touch-icon" href="./tsseract.ico" />
          <meta name="author" content="Jeremy" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="description"
            content="Tsseract is home for every idea, script or thought you want share"
          />
          <meta name="application-name" content="Tsseract" />
          <meta name="apple-mobile-web-app-title" content="Tsseract" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-navbutton-color"
            content={theme.palette.primary.main}
          />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta property="og:site_name" content="Tsseract" />
          <meta property="og:title" content="Tsseract" />
          <meta property="og:url" content="http://tsseract.askjere.com" />
          <meta
            property="og:description"
            content="Tsseract is home for every idea, script or thought you want share"
          />
          <meta property="og:image" content="/frame.png" />
          <meta property="og:type" content="website" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Playfair+Display&family=Source+Code+Pro&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,900;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body style={{ margin: 0, position: 'relative', minHeight: '100vh' }}>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{ __html: getUserScript(userData.user) }}
          />
        </body>
        <script
          async
          charSet="utf-8"
          src="https://platform.twitter.com/widgets.js"
        />
      </Html>
    );
  }
}
