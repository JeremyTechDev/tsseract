import Head from 'next/head';
import Box from '@mui/material/Box';

import Main from '../components/LandingPage/Main';
import Middle from '../components/LandingPage/Middle';
import ContributeSection from '../components/LandingPage/ContributeSection';
import Footer from '../components/LandingPage/Footer';
import Tweets from '../components/LandingPage/Tweets';
import TwitterMeta from '../components/Meta/Twitter';

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Tesseract</title>
        <TwitterMeta
          title="Share/Find guidance now! ⚡️"
          card="summary_large_image"
        />
      </Head>

      <Box>
        <Main />
        <Middle />
        <Tweets />
        <ContributeSection />
        <Footer />
      </Box>
    </>
  );
};

export default LandingPage;
