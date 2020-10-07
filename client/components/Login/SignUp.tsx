import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { Typography, Grid, Button, TextField } from '@material-ui/core';

import AppContext, { Types } from '../../context';
import Input from './Input';
import useValidation from '../../hooks/useValidation';
import useStyles from './styles';
import useFetch from '../../hooks/useFetch';

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
  const [requestError, setRequestError] = useState('');
  const [errors, setErrors] = useState<User>({
    birthDate: '',
    email: '',
    name: '',
    password: '',
    rPassword: '',
    username: '',
  });
  const { handleFetch } = useFetch('/api/users/', 'POST');
  const { dispatch } = useContext(AppContext);

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    setRequestError('');

    const { name, username, email, password, birthDate } = user;

    // if no errors
    if (!Boolean(Object.keys(errs).length)) {
      handleFetch({
        name,
        username,
        email,
        password,
        birthDate: new Date(birthDate).getTime(),
      })
        .then((res) => {
          if (res?.response.ok) {
            dispatch({
              type: Types.SET_AUTH_TOKEN,
              payload: res.data.authToken,
            });
            localStorage.setItem('tsseract-auth-token', res.data.authToken);
            Router.push('/create-post');
          } else {
            setRequestError(res?.data.error);
          }
        })
        .catch((error) =>
          alert(`Could not register the user\nError: ${error.message}`),
        );
    }
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography align="center" variant="h3" paragraph>
        Sign Up to Tsseract
      </Typography>
      <form onSubmit={handleSubmit}>
        {Boolean(requestError) && (
          <Typography align="center" color="error" variant="subtitle1">
            {requestError}
          </Typography>
        )}
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
          required
          type="date"
          value={user.birthDate}
          variant="outlined"
        />
      </form>

      <Button
        className={classes.btn}
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
