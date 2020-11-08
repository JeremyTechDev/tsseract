import React, { useState, useContext } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Typography, Grid, Button, TextField } from '@material-ui/core';

import AppContext, { Types } from '../../context';
import Input from './Input';
import useValidation from '../../hooks/useValidation';
import useStyles from './styles';
import { iSignUpUser, InputChangeEvent } from '../../@types';

interface Props {
  user: iSignUpUser;
  handleChange: (event: InputChangeEvent) => void;
}

const SignUp: React.FC<Props> = ({ user, handleChange }) => {
  const classes = useStyles({});
  const { validate } = useValidation(user);
  const [requestError, setRequestError] = useState('');
  const [errors, setErrors] = useState<iSignUpUser>({
    birthDate: '',
    email: '',
    name: '',
    password: '',
    rPassword: '',
    username: '',
  });
  const { dispatch } = useContext(AppContext);

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    setRequestError('');

    const { name, username, email, password, birthDate } = user;

    // if no errors
    if (!Boolean(Object.keys(errs).length)) {
      axios
        .post('/api/users/', {
          name,
          username,
          email,
          password,
          birthDate: new Date(birthDate).getTime(),
        })
        .then(({ data, status }) => {
          if (status === 200) {
            dispatch({
              type: Types.SET_CREDENTIALS,
              payload: data,
            });

            Router.push('/create-post');
          } else {
            setRequestError(data.error);
          }
        })
        .catch((error) => setRequestError(error.response.data.error));
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
