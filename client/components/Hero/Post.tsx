import { useState, useEffect, FC } from 'react';
import { Grid, Typography } from '@material-ui/core';

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
    <Grid
      className={classes.hero}
      container
      direction="column"
      justify="space-between"
    >
      <img
        alt="Logo"
        width="300"
        style={{ position: 'absolute' }}
        src="/Main-aside/white_logo_transparent_background.png"
      />

      <Grid item>
        <img
          alt={title || ''}
          className={classes.img}
          src={cover}
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        />
      </Grid>

      <Grid item>
        <Typography className={classes.title} variant="h1">
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PostHero;
