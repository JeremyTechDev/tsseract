import { Grid, TextField } from '@material-ui/core';

import useStyles from './styles';
import { InputChangeEvent } from '../../@types';

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
        color="primary"
        error={error}
        helperText={error && helperText}
        label={label}
        name={name || label.toLowerCase()}
        onChange={handleChange}
        variant="outlined"
        required
        {...props}
      />
    </Grid>
  );
};

export default Input;
