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
            <SignUp
              clientId={clientId}
              handleChange={handleChange}
              user={user}
            />
          )) || (
            <SignIn
              clientId={clientId}
              handleChange={handleChange}
              user={user}
            />
          )}

          <Divider light />

          <Typography align="center">
            {showSignUp
              ? 'Already have an account?'
              : "Don't have an account yet?"}
            <Button color="primary" onClick={() => setShowSignUp(!showSignUp)}>
              {showSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
          </Typography>
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
