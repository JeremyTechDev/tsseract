import Link from 'next/link';
import Head from 'next/head';
import { NextPage } from 'next';
import { Button, Divider, Grid, Typography } from '@material-ui/core';

import Avatar from '../components/Avatar/Avatar';

const AVATAR = {
  accessoriesType: 'Round',
  clotheColor: 'Red',
  clotheType: 'GraphicShirt',
  eyeType: 'Cry',
  eyebrowType: 'SadConcerned',
  facialHairType: 'Blank',
  hairColor: 'SilverGray',
  mouthType: 'Sad',
  skinColor: 'Brown',
  topType: 'LongHairStraightStrand',
};

interface Props {
  statusCode?: number;
}
const ErrorPage: NextPage<Props> = ({ statusCode = 404 }) => {
  return (
    <>
      <Head>
        <title>
          Tsseract - {statusCode === 404 ? 'Page not found' : 'Error'}
        </title>
      </Head>

      <Link href="/">
        <img
          alt="logo"
          src="/Main-aside/white_logo_transparent_background.png"
          width="250"
          style={{ position: 'absolute' }}
        />
      </Link>

      <Grid
        alignItems="center"
        container
        justifyContent="center"
        style={{ height: '100vh' }}
      >
        <Grid item xs={12} md={5} container justifyContent="center">
          <Avatar size="600px" avatar={AVATAR} />
        </Grid>

        <Grid item xs={10} md={7} container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h1">Ops!</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h2">
              {statusCode === 404
                ? "We can't seem to find the page you are looking for"
                : 'An unexpected error ocurred'}
            </Typography>
          </Grid>

          <Grid item>
            {statusCode && (
              <Typography variant="h5">
                {statusCode}
                {' - '}
                {statusCode === 404
                  ? 'Page not found'
                  : statusCode >= 500 && 'Server Error'}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <Grid item>
            <Link href="/home">
              <Button color="primary" variant="contained">
                Go back home
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ErrorPage;
