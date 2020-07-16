import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import '../../../scss/layout.scss';

interface Props {
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <header className="example">
      <Link href="/">
        <a>Home</a>
      </Link>
    </header>

    {children}

    <footer />
  </div>
);

export default Layout;
