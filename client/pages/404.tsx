import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Container,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  Theme,
} from '@material-ui/core';

import Avatar from '../components/Avatar/Avatar';

const useStyles = makeStyles({
  divider: { margin: '20px 0' },
  logo: { position: 'fixed', top: 40, left: 40 },
});

const avatar = {
  accessoriesType: 'Round',
  clotheColor: 'Red',
  clotheType: 'Hoodie',
  eyebrowType: 'SadConcernedNatural',
  eyeType: 'Cry',
  facialHairType: 'Blank',
  hairColor: 'SilverGray',
  mouthType: 'Sad',
  skinColor: 'Brown',
  topType: 'LongHairStraightStrand',
};

const Custom404: NextPage = () => {
  const classes = useStyles();
  const small = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
      <Head>
        <title>Tsseract - Page not found</title>
      </Head>

      <Link href="/">
        <Image
          className={classes.logo}
          height={100}
          src="/Main-aside/white_logo_transparent_background.png"
          width={227.8}
        />
      </Link>

      <Grid
        alignItems="center"
        container
        direction={small ? 'column' : 'row'}
        justify="center"
      >
        <Grid item xs={12} sm={5}>
          <Avatar size={small ? '300px' : '600px'} avatar={avatar} />
        </Grid>

        <Grid item xs={12} sm={7}>
          <Container>
            <Typography variant="h1">Ops!</Typography>

            <Typography variant="h2">We can't seem to find</Typography>

            <Typography variant="h2" paragraph>
              the page you are looking for
            </Typography>

            <Divider className={classes.divider} />

            <Link href="/">
              <Button color="primary" variant="contained">
                Go back home
              </Button>
            </Link>
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Custom404;
