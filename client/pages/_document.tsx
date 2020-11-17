import React from 'react';
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

import { getServerSideToken, getUserScript } from '../lib/auth';
import { iUser } from '../@types';

export default class MyDocument extends Document<{ user: iUser }> {
  static async getInitialProps(ctx: DocumentContext) {
    const props = await Document.getInitialProps(ctx);
    const userData = getServerSideToken(ctx.req);

    return { ...props, user: userData };
  }

  render() {
    const { user } = this.props;

    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="manifest" href="./manifest.json" />
          <link rel="icon" href="./tsseract.ico" />
          <link rel="apple-touch-icon" href="./tsseract.ico" />
          <meta name="author" content="Jeremy Muñoz" />
          <meta name="theme-color" content="#f13c20" />
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

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Playfair+Display&family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={{ margin: 0, position: 'relative', minHeight: '100vh' }}>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </Html>
    );
  }
}
