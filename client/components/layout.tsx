import React from 'react';
import Head from 'next/head';

import '../../../scss/layout.scss';

interface Props {
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => (
  <div className="layout">
    <Head>
      <title>{title}</title>
    </Head>

    {children}
  </div>
);

export default Layout;
