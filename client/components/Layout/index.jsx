import Link from 'next/link';
import Head from 'next/head';

import './styles.scss';

const Layout = ({ children, title }) => (
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
