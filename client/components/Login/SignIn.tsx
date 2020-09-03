import React, { useState } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';

import Input from './Input';
import useValidation from '../../hooks/useValidation';

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
  const { validate } = useValidation(user);
  const [errors, setErrors] = useState<User>({
    username: '',
    password: '',
  });

  const handleSubmit = () => {
    setErrors(validate());
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography align="center" variant="h3" paragraph>
        Sign In to Tsseract
      </Typography>

      <form onSubmit={handleSubmit}>
        <Input
          error={Boolean(errors.username)}
          handleChange={handleChange}
          helperText={errors.username}
          label="Username"
          value={user.username}
        />

        <Input
          error={Boolean(errors.password)}
          handleChange={handleChange}
          helperText={errors.password}
          label="Password"
          type="password"
          value={user.password}
        />
      </form>

      <Button color="secondary" onClick={handleSubmit} variant="contained">
        Sign In
      </Button>
    </Grid>
  );
};

export default SignIn;
