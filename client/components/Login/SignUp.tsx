import React from 'react';
import { Typography, Grid, Button, TextField } from '@material-ui/core';

import Input from './Input';
import useFetch from '../../hooks/useFetch';
import useStyles from './styles';

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

interface Props {
  user: {
    name: string;
    email: string;
    password: string;
    rPassword: string;
    username: string;
  };
  handleChange: (event: InputChangeEvent) => void;
}

const SignUp: React.FC<Props> = ({ user, handleChange }) => {
  const classes = useStyles({});
  const [data, handleFetch] = useFetch('/api/users/', 'POST');

  return (
    <Grid container direction="column" alignItems="center">
      <Typography align="center" variant="h3" paragraph>
        Sign Up to Tsseract
      </Typography>
      <Input
        className={classes.margin}
        handleChange={handleChange}
        label="Name"
        value={user.name}
      />
      <Input
        className={classes.margin}
        handleChange={handleChange}
        label="Username"
        value={user.username}
      />
      <Input
        className={classes.margin}
        handleChange={handleChange}
        label="Email"
        type="email"
        value={user.email}
      />
      <Input
        className={classes.margin}
        handleChange={handleChange}
        label="Password"
        type="password"
        value={user.password}
      />
      <Input
        className={classes.margin}
        handleChange={handleChange}
        label="Repeat Password"
        name="rPassword"
        type="password"
        value={user.rPassword}
      />
      <TextField
        className={classes.birthdayInput}
        label="Birthday"
        type="date"
        variant="outlined"
      />

      <Button className={classes.margin} color="primary" variant="contained">
        Sign Up
      </Button>
    </Grid>
  );
};

export default SignUp;
