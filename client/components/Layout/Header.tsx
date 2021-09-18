import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Grid,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { PostAdd, Face, Menu as MenuIcon, ExitToApp } from '@material-ui/icons';

import AppContext, { Types } from '../../context';
import { logoutUser } from '../../lib/auth';
import useStyles from './styles';

const Header = () => {
  const classes = useStyles();
  const {
    state: { isAuthenticated, user },
    dispatch,
  } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    dispatch({ type: Types.SET_CREDENTIALS, payload: null });
    logoutUser();
  };

  return (
    <AppBar className={classes.header}>
      <Toolbar>
        <Grid container justifyContent="space-around" alignItems="center">
          <Link href={isAuthenticated ? '/posts' : '/'}>
            <Image
              alt="Tsseract logo"
              height={100}
              priority
              src="/Main-aside/white_logo_transparent_background.png"
              width={238}
            />
          </Link>

          <Box className={classes.sectionDesktop}>
            {isAuthenticated ? (
              <>
                <Button onClick={handleLogOut} className={classes.spacing}>
                  Log Out
                </Button>
                <Link href={`/profile/${user?.username}`}>
                  <Button
                    color="secondary"
                    endIcon={<Face />}
                    variant="contained"
                  >
                    Profile
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/login">
                <Button className={classes.spacing}>Log In</Button>
              </Link>
            )}

            <Link href="/write-message">
              <Button
                className={classes.spacing}
                color="secondary"
                endIcon={<PostAdd />}
                variant="contained"
              >
                Create Post
              </Button>
            </Link>
          </Box>
        </Grid>

        <Box className={classes.sectionMobile}>
          <IconButton id="mobile-menu" onClick={handleClick} color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </MenuItem>

        <Link href={`/profile/${user?.username}`}>
          <MenuItem>
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
        </Link>

        <Link href="/write-message">
          <MenuItem>
            <ListItemIcon>
              <PostAdd />
            </ListItemIcon>
            <ListItemText>Create Post</ListItemText>
          </MenuItem>
        </Link>
      </Menu>
    </AppBar>
  );
};

export default Header;
