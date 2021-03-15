import { FC, ReactNode, useContext } from 'react';
import Link from 'next/link';
import { Typography, AppBar, Toolbar, Grid, Paper } from '@material-ui/core';

import AppContext from '../../context';
import Avatar from '../Avatar/Avatar';
import useStyles from './styles';

interface Props {
  children: ReactNode;
}

const TagBarLayout: FC<Props> = ({ children }) => {
  const classes = useStyles();
  const {
    state: { user },
  } = useContext(AppContext);

  return (
    <div className={classes.tagBar}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Link href={`/profile/${user?.username}`}>
              <Avatar avatar={user?.avatar || {}} size="80px" />
            </Link>

            <Grid item>
              <Typography variant="h5">{user?.name}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Paper className={classes.tagBarTags} square elevation={5}>
        {children}
      </Paper>
    </div>
  );
};

export default TagBarLayout;
