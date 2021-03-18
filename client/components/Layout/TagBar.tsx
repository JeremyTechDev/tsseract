import { FC, ReactNode, useContext } from 'react';
import {
  Typography,
  TextField,
  AppBar,
  Toolbar,
  Grid,
  Paper,
} from '@material-ui/core';

import AppContext from '../../context';
import Avatar from '../Avatar/Avatar';
import useStyles from './styles';
import Link from '../Link';

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
          <Grid container alignItems="center">
            <Link href={`/profile/${user?.username}`}>
              <Avatar avatar={user?.avatar || {}} size="80px" />
            </Link>

            <Link href={`/profile/${user?.username}`}>
              <Typography variant="h5">{user?.name}</Typography>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>

      <Paper className={classes.tagBarTags} square elevation={5}>
        <TextField fullWidth label="🔍 Search for a tag..." variant="filled" />

        {children}
      </Paper>
    </div>
  );
};

export default TagBarLayout;
