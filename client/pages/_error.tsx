import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import Avatar from '../components/Avatar/Avatar';

const useStyles = makeStyles({
  root: { height: '90vh' },
  divider: { margin: '20px 0' },
  logo: { height: 100, position: 'fixed', top: 20, left: 20 },
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

const errors = {
  0: '',
  404: ' - Page not found',
  500: ' - Server Error',
};

interface Props {
  statusCode?: number;
}
const Error: NextPage<Props> = ({ statusCode }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Link href="/">
        <img
          className={classes.logo}
          src="/Main-aside/white_logo_transparent_background.png"
        />
      </Link>

      <Avatar size="600px" avatar={avatar} />

      <Grid item>
        <Typography variant="h1">Ops!</Typography>
        <Typography variant="h2">We can't seem to find</Typography>
        <Typography variant="h2" paragraph>
          the page you are looking for
        </Typography>
        {statusCode && (
          <Typography variant="h5">
            {statusCode}
            {errors[statusCode || 0]}
          </Typography>
        )}

        <Divider className={classes.divider} />

        <Link href="/">
          <Button color="primary" variant="contained">
            Go back home
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Error;
