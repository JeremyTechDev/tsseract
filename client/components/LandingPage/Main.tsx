import { Button, Grid, Paper, Typography } from '@material-ui/core';
import Dot from '@material-ui/icons/FiberManualRecord';

import useStyles from './styles';

const Main = () => {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      className={classes.container}
      container
      justifyContent="center"
    >
      <Paper elevation={12} className={classes.window}>
        <Grid container>
          <Grid item container>
            <Grid item>
              <Dot style={{ color: '#ff605c' }} />
            </Grid>

            <Grid item>
              <Dot style={{ color: '#ffbd44' }} />
            </Grid>

            <Grid item>
              <Dot style={{ color: '#00ca4e' }} />
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography align="center" variant="h1">
                Tsseract
              </Typography>
            </Grid>

            <Grid item>
              <Typography align="center" variant="subtitle1">
                Tsseract is home for every idea, script or thought you want to
                share.
              </Typography>
            </Grid>

            <Grid item>
              <Button
                color="primary"
                href="/home"
                size="large"
                variant="contained"
              >
                Feed Me!
              </Button>
            </Grid>

            <Grid item />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Main;
