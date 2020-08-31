import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';

import Input from './Input';
import useStyles from './styles';

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

interface Props {
  user: {
    password: string;
    username: string;
  };
  handleChange: (event: InputChangeEvent) => void;
}

const SignIn: React.FC<Props> = ({ user, handleChange }) => {
  const classes = useStyles({});

  return (
    <Grid container direction="column" alignItems="center">
      <Typography align="center" variant="h3" paragraph>
        Sign In to Tsseract
      </Typography>

      <Input
        className={classes.margin}
        handleChange={handleChange}
        label="Username"
        value={user.username}
      />

      <Input
        className={classes.margin}
        handleChange={handleChange}
        label="Password"
        type="password"
        value={user.password}
      />

      <Button className={classes.margin} color="primary" variant="contained">
        Sign In
      </Button>
    </Grid>
  );
};

export default SignIn;
