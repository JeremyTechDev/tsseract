import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';

import AppContext, { Types } from '../../context';
import Input from './Input';
import useStyles from './styles';
import useValidation from '../../hooks/useValidation';
import { iSignUpUser, InputChangeEvent } from '../../@types';
import { loginUser } from '../../lib/auth';
import { postRequest } from '../../lib/fetch';

interface Props {
  user: iSignUpUser;
  handleChange: (event: InputChangeEvent) => void;
}

const SignUp: React.FC<Props> = ({ user, handleChange }) => {
  const classes = useStyles({});
  const { validate } = useValidation(user);
  const [requestError, setRequestError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<iSignUpUser>({
    email: '',
    name: '',
    password: '',
    rPassword: '',
  });
  const { dispatch } = useContext(AppContext);

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    setRequestError('');
    setLoading(true);

    const { name, email, password } = user;

    // if no errors
    if (!Boolean(Object.keys(errs).length)) {
      postRequest('/users/', {
        name,
        email,
        password,
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            dispatch({
              type: Types.SET_CREDENTIALS,
              payload: data,
            });

            Router.push('/posts');
          } else {
            setRequestError(data.error);
            setLoading(false);
          }
        })
        .then(() => loginUser({ email, password }))
        .catch((error) => console.error(error.message));
    } else {
      setLoading(false);
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
      </form>

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
          'Sign Up'
        )}
      </Button>
    </Grid>
  );
};

export default SignUp;
