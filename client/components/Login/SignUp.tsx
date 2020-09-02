import React, { useState } from 'react';
import { Typography, Grid, Button, TextField } from '@material-ui/core';

import Input from './Input';
import useFetch from '../../hooks/useFetch';
import useValidation from '../../hooks/useValidation';
import useStyles from './styles';

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

type User = {
  email: string;
  name: string;
  password: string;
  rPassword: string;
  username: string;
};

interface Props {
  user: User;
  handleChange: (event: InputChangeEvent) => void;
}

const SignUp: React.FC<Props> = ({ user, handleChange }) => {
  const classes = useStyles({});
  const [data, handleFetch] = useFetch('/api/users/', 'POST');
  const [errors, setErrors] = useState<User>({
    email: '',
    name: '',
    password: '',
    rPassword: '',
    username: '',
  });

  const handleSubmit = () => {
    setErrors(useValidation(user));
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography align="center" variant="h3" paragraph>
        Sign Up to Tsseract
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          error={Boolean(errors.name)}
          handleChange={handleChange}
          helperText={errors.name}
          label="Name"
          value={user.name}
        />
        <Input
          error={Boolean(errors.username)}
          handleChange={handleChange}
          helperText={errors.username}
          label="Username"
          value={user.username}
        />
        <Input
          error={Boolean(errors.email)}
          handleChange={handleChange}
          helperText={errors.email}
          label="Email"
          type="email"
          value={user.email}
        />
        <Input
          error={Boolean(errors.password)}
          handleChange={handleChange}
          helperText={errors.password}
          label="Password"
          type="password"
          value={user.password}
        />
        <Input
          error={Boolean(errors.rPassword)}
          handleChange={handleChange}
          helperText={errors.rPassword}
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
      </form>

      <Button
        className={classes.margin}
        color="primary"
        onClick={handleSubmit}
        variant="contained"
      >
        Sign Up
      </Button>
    </Grid>
  );
};

export default SignUp;
