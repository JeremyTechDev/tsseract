import React, { useState } from 'react';
import { Typography, Grid, Button, TextField } from '@material-ui/core';

import Input from './Input';
import useValidation from '../../hooks/useValidation';
import useStyles from './styles';

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

type User = {
  birthDate: string;
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
  const { validate } = useValidation(user);
  const [errors, setErrors] = useState<User>({
    birthDate: '',
    email: '',
    name: '',
    password: '',
    rPassword: '',
    username: '',
  });

  const handleSubmit = () => {
    setErrors(validate());
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
          className={classes.margin}
          error={Boolean(errors.birthDate)}
          helperText={errors.birthDate}
          label="Birthday"
          name="birthDate"
          onChange={handleChange}
          value={user.birthDate}
          type="date"
          variant="outlined"
          placeholder=""
        />
      </form>

      <Button
        className={classes.btn}
        color="secondary"
        onClick={handleSubmit}
        variant="contained"
      >
        Sign Up
      </Button>
    </Grid>
  );
};

export default SignUp;
