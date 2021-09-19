import { Grid, Link, Typography, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import useStyles from './styles';

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
  const classes = useStyles();

  return (
    <footer className={`gradient--background ${classes.footer}`}>
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
              <IconButton
                color="inherit"
                href={link}
                title={title}
                size="large"
              >
                <Icon fontSize="large" />
              </IconButton>
            </Grid>
          ))}
        </Grid>

        <Link variant="h5" color="textSecondary" href="/terms-of-use">
          Terms of Use
        </Link>
      </Grid>
    </footer>
  );
};

export default Footer;
