import { useState, useEffect, FC } from 'react';
import { Link, Grid, Typography } from '@mui/material';

import useStyles from './styles';

interface Props {
  cover: string;
  title?: string;
}

const PostHero: FC<Props> = ({ cover, title }) => {
  const classes = useStyles();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Handle image overlay on scroll
    function handleScroll() {
      setOffset(window.pageYOffset);
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return (
    <>
      <Link href="/home">
        <img
          alt="Tsseract Logo"
          width="200"
          style={{ position: 'absolute' }}
          src="/Main-aside/white_logo_transparent_background.png"
        />
      </Link>

      <Grid
        className={classes.hero}
        container
        direction="column"
        justifyContent="space-between"
      >
        <Grid item>
          <img
            alt={title || ''}
            className={classes.img}
            src={cover}
            style={{ transform: `translateY(${offset * 0.5}px)` }}
          />
        </Grid>

        <Grid item>
          <Typography className={classes.title} variant="h2" component="h1">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default PostHero;
