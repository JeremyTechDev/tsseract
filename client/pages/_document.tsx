import React from 'react';
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

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
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    const { userData } = this.props;
    const { GOOGLE_ANALYTICS_KEY } = process.env;

    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="UTF-8" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_KEY}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || []
                function gtag(){dataLayer.push(arguments)};
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ANALYTICS_KEY}')
              `,
            }}
          />

          <link rel="manifest" href="./manifest.json" />
          <link rel="icon" href="./tsseract.ico" />
          <link rel="apple-touch-icon" href="./tsseract.ico" />
          <meta name="author" content="Jeremy Muñoz" />
          <meta
            name="theme-color"
            content={theme('dark').palette.primary.main}
          />
          <meta
            name="description"
            content="Social media app to share your knowledge on ant topic and earn money 💸 with it."
          />
          <meta name="application-name" content="Tsseract" />
          <meta name="apple-mobile-web-app-title" content="Tsseract" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="msapplication-navbutton-color" content="#f6404f" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta property="og:site_name" content="Tsseract" />
          <meta property="og:title" content="Tsseract" />
          <meta property="og:url" content="http://tsseract.io" />
          <meta
            property="og:description"
            content="Social media app to share your knowledge on ant topic and earn money 💸 with it."
          />
          <meta
            property="og:image"
            itemProp="image"
            content="./Square-bottom/logo_size.jpg"
          />
          <meta property="og:type" content="website" />
          <meta property="og:updated_time" content="1604951865715" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Playfair+Display&family=Roboto&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
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
      </Html>
    );
  }
}
