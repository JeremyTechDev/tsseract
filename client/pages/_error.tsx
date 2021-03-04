import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Button,
  Container,
  Divider,
  Grid,
  Theme,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';

import Avatar from '../components/Avatar/Avatar';

const useStyles = makeStyles({
  divider: { margin: '20px 0' },
  logo: { position: 'fixed', top: 40, left: 40 },
});

const avatar = {
  accessoriesType: 'Blank',
  clotheColor: 'Red',
  clotheType: 'GraphicShirt',
  eyeType: 'Cry',
  eyebrowType: 'SadConcerned',
  facialHairType: 'Blank',
  graphicType: 'Hola',
  hairColor: 'Black',
  mouthType: 'Concerned',
  skinColor: 'Light',
  topType: 'LongHairNotTooLong',
};

interface Props {
  statusCode?: number;
}
const Error: NextPage<Props> = ({ statusCode = 500 }) => {
  const classes = useStyles();
  const small = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <Head>
        <title>Tsseract - Error</title>
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
        <Grid item xs={12} md={6}>
          <Avatar size={small ? '300px' : '600px'} avatar={avatar} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Container>
            <Typography variant="h1">Ops!</Typography>

            <Typography variant="h2">An unexpected</Typography>

            <Typography variant="h2" paragraph>
              has occurred
            </Typography>

            <Typography variant="h5">Status code: {statusCode}</Typography>

            <Divider className={classes.divider} />

            <Link href="/">
              <Button color="primary" variant="contained">
                Go back home
              </Button>
            </Link>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Error;
