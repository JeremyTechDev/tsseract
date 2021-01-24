import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { CircularProgress, Typography, Grid, Button } from '@material-ui/core';

import AppContext, { Types } from '../../context';
import Input from './Input';
import useStyles from './styles';
import * as Google from './GoogleLogin';
import { InputChangeEvent, iSignInUser } from '../../@types';
import { loginUser } from '../../lib/auth';

interface Props {
  user: iSignInUser;
  clientId: string;
  handleChange: (event: InputChangeEvent) => void;
}

const SignIn: React.FC<Props> = ({ user, handleChange, clientId }) => {
  const classes = useStyles({});
  const [requestError, setRequestError] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppContext);

  const handleClearAndChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRequestError('');
    handleChange(event);
  };

  const handleSubmit = async () => {
    const { email, password } = user;
    setLoading(true);

    loginUser({ email, password }).then((data) => {
      if (!data.error) {
        dispatch({
          type: Types.SET_CREDENTIALS,
          payload: data.user || null,
        });
        Router.push('/posts');
      } else {
        setRequestError(data.error);
        setLoading(false);
      }
    });
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography align="center" variant="h3" paragraph>
        Sign In to Tsseract
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container direction="column" alignItems="center">
          {Boolean(requestError) && (
            <Typography align="center" color="error" variant="subtitle1">
              {requestError}
            </Typography>
          )}
          <Input
            handleChange={handleClearAndChange}
            label="Email"
            value={user.email}
          />

          <Input
            handleChange={handleClearAndChange}
            label="Password"
            type="password"
            value={user.password}
          />
        </Grid>
      </form>

      <Grid item container justify="center">
        <Google.Login
          className={classes.btn}
          clientId={clientId}
          text="Sign In with Google"
        />

        <Button
          className={classes.btn}
          color="primary"
          disabled={loading}
          onClick={handleSubmit}
          variant="contained"
        >
          {loading ? (
            <CircularProgress className={classes.progress} size={24} />
          ) : (
            'Sign In'
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignIn;
