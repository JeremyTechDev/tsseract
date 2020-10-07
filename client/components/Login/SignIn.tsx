import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { Typography, Grid, Button } from '@material-ui/core';

import AppContext, { Types } from '../../context';
import useFetch from '../../hooks/useFetch';
import Input from './Input';
import useStyles from './styles';

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

type User = {
  password: string;
  username: string;
};

interface Props {
  user: User;
  handleChange: (event: InputChangeEvent) => void;
}

const SignIn: React.FC<Props> = ({ user, handleChange }) => {
  const classes = useStyles({});
  const [requestError, setRequestError] = useState('');
  const { dispatch } = useContext(AppContext);
  const { handleFetch } = useFetch('/api/auth/', 'POST');

  const handleClearAndChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRequestError('');
    handleChange(event);
  };

  const handleSubmit = async () => {
    const { username, password } = user;

    handleFetch({ username, password })
      .then((res) => {
        if (res?.response.ok) {
          dispatch({
            type: Types.SET_AUTH_TOKEN,
            payload: { id: res.data.data._id },
          });
          Router.push('/create-post');
        } else {
          setRequestError('Invalid username or password');
        }
      })
      .catch((error) =>
        alert(`Could not register the user\nError: ${error.message}`),
      );
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography align="center" variant="h3" paragraph>
        Sign In to Tsseract
      </Typography>

      <form onSubmit={handleSubmit}>
        {Boolean(requestError) && (
          <Typography align="center" color="error" variant="subtitle1">
            {requestError}
          </Typography>
        )}
        <Input
          handleChange={handleClearAndChange}
          label="Username"
          value={user.username}
        />

        <Input
          handleChange={handleClearAndChange}
          label="Password"
          type="password"
          value={user.password}
        />
      </form>

      <Button
        className={classes.btn}
        color="primary"
        onClick={handleSubmit}
        variant="contained"
      >
        Sign In
      </Button>
    </Grid>
  );
};

export default SignIn;
