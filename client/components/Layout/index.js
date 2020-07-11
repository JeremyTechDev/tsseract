import Link from 'next/link';

import './styles.scss';

const Layout = ({ children }) => (
  <div>
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
