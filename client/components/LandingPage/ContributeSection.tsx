import { useState } from 'react';
import {
  Alert,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import BoxIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckedBoxIcon from '@mui/icons-material/CheckBox';

import useStyles from './styles';

const TODO = [
  { text: 'Chat-like interface', checked: true },
  { text: 'Cool avatars picker', checked: false },
  { text: 'Meta tags for Twitter', checked: true },
  { text: 'Monetization 💸', checked: false },
  { text: 'Published 🚀', checked: true },
  { text: 'Richest text-editor', checked: false },
  { text: 'Share on Twitter', checked: false },
  { text: 'Sick lading page', checked: true },
  { text: 'User accounts', checked: false },
  { text: 'User engagement features', checked: true },
];

const ContributeSection = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = (isChecked: boolean) => {
    setIsOpen(true);
    setIsChecked(isChecked);
  };

  const handleClose = (_: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  return (
    <Grid item>
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={6}>
          <Grid item xs={false} md={1} />

          <Grid item xs={12} md={5}>
            <Paper elevation={10} className={classes.window}>
              <Typography variant="h3" paragraph className={classes.codeFont}>
                Do you Open Source?
              </Typography>

              <Typography
                variant="subtitle1"
                paragraph
                className={classes.codeFont}
              >
                Even if you are just starting, take a look at{' '}
                <Link href="https://github.com/jeremy2918/tsseract">
                  the repo
                </Link>{' '}
                and just open a pull request!
              </Typography>

              <Typography
                variant="subtitle1"
                paragraph
                className={classes.codeFont}
              >
                There might already be an issue or two that you can handle.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" className={classes.codeFont} gutterBottom>
              /* TODO: */
            </Typography>

            <Grid container>
              {TODO.map(({ text, checked }) => (
                <Grid item key={text} container alignItems="center">
                  <Grid item>
                    <IconButton onClick={() => handleClick(checked)} size="large">
                      {checked ? <CheckedBoxIcon /> : <BoxIcon />}
                    </IconButton>
                  </Grid>

                  <Grid item>
                    <Typography className={classes.codeFont} variant="h6">
                      {text}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {isChecked
            ? 'This feature is already done! You disagree? 🤔'
            : 'Still need to implement this... Wanna help? 🌚'}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ContributeSection;
