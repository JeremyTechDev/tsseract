import React from 'react';
import { Grid, TextField } from '@material-ui/core';

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

interface Props {
  className: string;
  label: string;
  name?: string;
  type?: 'password';
  value: string;
  handleChange: (event: InputChangeEvent) => void;
}

const Input: React.FC<Props> = ({ handleChange, name, label, ...props }) => {
  return (
    <Grid item>
      <TextField
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
