import React, { useState } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';

import Input from './Input';
import useFetch from '../../hooks/useFetch';
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
  const [response, handleFetch] = useFetch('/api/auth/', 'POST');

  const handleSubmit = async () => {
    await handleFetch(user);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography align="center" variant="h3" paragraph>
        Sign In to Tsseract
      </Typography>

      <form onSubmit={handleSubmit}>
        <Input
          handleChange={handleChange}
          label="Username"
          value={user.username}
        />

        <Input
          handleChange={handleChange}
          label="Password"
          type="password"
          value={user.password}
        />
      </form>

      <Button
        className={classes.btn}
        color="secondary"
        onClick={handleSubmit}
        variant="contained"
      >
        Sign In
      </Button>
    </Grid>
  );
};

export default SignIn;
