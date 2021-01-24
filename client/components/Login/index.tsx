import React, { useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import ImgInfo from './ImgInfo';
import SignIn from './SignIn';
import SignUp from './SignUp';
import useForm from '../../hooks/useForm';
import useStyles from './styles';
import GoogleLogin from './GoogleLogin';
import { iBackgroundImageData } from '../../@types';

interface Props {
  bgData: iBackgroundImageData;
  clientId: string;
}

const Login: React.FC<Props> = ({ bgData, clientId }) => {
  const router = useRouter();
  const classes = useStyles({ bg: bgData.img });
  const [showSignUp, setShowSignUp] = useState(router.query.view === 'signUp');
  const [user, handleChange] = useForm({
    email: '',
    name: '',
    password: '',
    rPassword: '',
  });

  return (
    <Grid className={classes.grid} container direction="row">
      <Hidden smDown>
        <Grid container item md={2} alignItems="flex-end">
          <ImgInfo bgData={bgData} />
        </Grid>
      </Hidden>

      <Grid item xs={12} md={5} />

      <Grid container item xs={false} md={4} alignItems="center">
        <Container className={classes.imgInfo}>
          {(showSignUp && (
            <SignUp handleChange={handleChange} user={user} />
          )) || <SignIn handleChange={handleChange} user={user} />}

          <Divider light className={classes.divider} />

          <Typography align="center">
            {showSignUp
              ? 'Already have an account?'
              : "Don't have an account yet?"}
            <Button color="primary" onClick={() => setShowSignUp(!showSignUp)}>
              {showSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
          </Typography>

          <Divider light className={classes.divider} />

          <Grid container direction="column" alignItems="center">
            <Typography variant="caption" align="center">
              or maybe
            </Typography>

            <GoogleLogin clientId={clientId} />
          </Grid>
        </Container>
      </Grid>

      <Hidden mdUp>
        <Grid container item md={2} alignItems="flex-end">
          <ImgInfo bgData={bgData} />
        </Grid>
      </Hidden>

      <Grid item xs={1} md={1} />
    </Grid>
  );
};

export default Login;
