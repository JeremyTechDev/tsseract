import Box from '@material-ui/core/Box';

import Main from '../components/LandingPage/Main';
import Middle from '../components/LandingPage/Middle';
import ContributeSection from '../components/LandingPage/ContributeSection';
import Footer from '../components/LandingPage/Footer';
import Tweets from '../components/LandingPage/Tweets';

const LandingPage = () => {
  return (
    <Box>
      <Main />
      <Middle />
      <Tweets />
      <ContributeSection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
