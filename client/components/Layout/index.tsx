import Head from 'next/head';
import { Paper } from '@mui/material';

import useStyles from './styles';
import Header from './Header';
import Footer from './Footer';

interface Props {
  children?: React.ReactNode;
  displayFooter?: boolean;
  displayNav?: boolean;
  title?: string;
}

const Layout: React.FC<Props> = ({
  children,
  displayFooter = true,
  displayNav = true,
  title = 'Tsseract',
}) => {
  const classes = useStyles(displayNav);

  return (
    <Paper className={classes.margin} square elevation={0}>
      <Head>
        <title>{title}</title>
      </Head>

      {displayNav && <Header />}
      <div className={classes.contentWrap}>{children}</div>
      {displayFooter && <Footer />}
    </Paper>
  );
};

export default Layout;
