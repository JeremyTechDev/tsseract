import { Grid, Link, Typography, IconButton } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const LINKS = [
  { Icon: TwitterIcon, title: 'Twitter', link: 'https://twitter.com/askjere' },
  {
    Icon: GitHubIcon,
    title: 'GitHub Repo',
    link: 'https://github.com/jeremy2918',
  },
  {
    Icon: LinkedInIcon,
    title: "Jeremy's CV",
    link: 'https://www.linkedin.com/in/askjere/',
  },
];

const Footer = () => {
  return (
    <footer className="footer--background">
      <Grid container direction="column" alignItems="center">
        <Typography variant="h2">again, Tsseract</Typography>

        <Typography variant="h4" paragraph>
          crafted with ♥️ by{' '}
          <Link color="textSecondary" href="https://twitter.com/askjere">
            @AskJere
          </Link>
        </Typography>

        <Typography variant="h4" paragraph>
          <Link color="textSecondary" href="mailto:jeremy2918@gmail.com">
            jeremy2918@gmail.com
          </Link>
        </Typography>

        <Grid item container spacing={2} justifyContent="center">
          {LINKS.map(({ Icon, title, link }) => (
            <Grid item key={link}>
              <IconButton title={title} color="inherit" href={link}>
                <Icon fontSize="large" />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
