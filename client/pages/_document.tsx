import React from 'react';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
  Html,
} from 'next/document';

import { getServerSideToken, getClientSideToken } from '../lib/auth';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const props = await Document.getInitialProps(ctx);
    const userData = ctx.req
      ? await getServerSideToken(ctx.req)
      : await getClientSideToken();

    return { ...props, user: userData };
  }

  render() {
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

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Playfair+Display&family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={{ margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
