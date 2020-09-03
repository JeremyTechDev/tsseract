import React, { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';

import ImgInfo from './ImgInfo';
import SignIn from './SignIn';
import SignUp from './SignUp';
import getRandomImg from '../../helpers/getRandomImg';
import useForm from '../../hooks/useForm';
import useStyles from './styles';

interface BgData {
  color?: string;
  description?: string;
  img: string;
  link?: string;
  name?: string;
  raw?: string;
}

const Login = () => {
  const [bgData, setBgData] = useState<BgData>({ img: '' });
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  const [user, handleChange] = useForm({
    birthDate: '',
    email: '',
    name: '',
    password: '',
    rPassword: '',
    username: '',
  });
  const classes = useStyles({ bg: bgData.img });

  useEffect(() => {
    setLoading(true);
    const fetchBgData = async () => {
      setBgData(await getRandomImg());
      setLoading(false);
    };

    fetchBgData();
  }, []);

  const handleViewChange = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    (loading && (
      <CircularProgress size={100} className={classes.centered} />
    )) || (
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
              <SignUp user={user} handleChange={handleChange} />
            )) || <SignIn user={user} handleChange={handleChange} />}

            <Divider light />

            <Typography align="center">
              {showSignUp
                ? 'Already have an account?'
                : "Don't have an account yet?"}
              <Button color="secondary" onClick={handleViewChange}>
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
    )
  );
};

export default Login;
