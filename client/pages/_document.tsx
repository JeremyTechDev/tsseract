import React from 'react';
import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript,
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
      <html lang="en-US">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="manifest" href="./static/manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Tsseract" />
          <meta name="apple-mobile-web-app-title" content="Tsseract" />
          <meta name="theme-color" content="#f6404f" />
          <meta name="msapplication-navbutton-color" content="#f6404f" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <link
            rel="icon"
            type="image/png"
            href="/static/Icon-bottom/logo_size.jpg"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/static/Icon-bottom/logo_size.jpg"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/Icon-bottom/logo_size_invert.jpg"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/static/Icon-bottom/logo_size_invert.jpg"
          />

          <meta
            name="description"
            content="Tsseract in a social media app were can create content and earn money 💸 with it."
          />
          <meta name="author" content="Jeremy Muñoz" />

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Playfair+Display&family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={{ margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
