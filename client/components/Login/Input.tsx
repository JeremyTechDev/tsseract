import React from 'react';
import { Grid, TextField } from '@material-ui/core';

import useStyles from './styles';

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

interface Props {
  label: string;
  name?: string;
  type?: 'password' | 'email';
  value: string;
  error?: boolean;
  helperText?: string;
  handleChange: (event: InputChangeEvent) => void;
}

const Input: React.FC<Props> = ({
  error,
  handleChange,
  helperText,
  label,
  name,
  ...props
}) => {
  const classes = useStyles({});

  return (
    <Grid item>
      <TextField
        className={classes.margin}
        color="secondary"
        error={error}
        helperText={error && helperText}
        label={label}
        name={name || label.toLowerCase()}
        onChange={handleChange}
        variant="outlined"
        {...props}
      />
    </Grid>
  );
};

export default Input;
