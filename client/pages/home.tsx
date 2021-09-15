import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NextPage, NextPageContext } from 'next';
import {
  AppBar,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Paper,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';

import Avatar from '../components/Avatar/Avatar';

import TagCard from '../components/Tag/Card';
import MessagePost from '../components/MessagePost';
import { authInitialProps } from '../lib/auth';
import { getRequest } from '../lib/fetch';
import { iPost, iTag } from '../@types';
import { makeStyles, createStyles } from '@material-ui/styles';
import AppContext from '../context';

const DRAWER_WIDTH = 350;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingBottom: 70,
      width: '100%',
    },
    newPostContainer: {
      zIndex: 99,
      position: 'fixed',
      bottom: 0,
      width: `calc(100vw - ${DRAWER_WIDTH}px)`,
      padding: `0 ${theme.spacing(3)}px`,
      left: DRAWER_WIDTH,
      [theme.breakpoints.down('md')]: {
        width: '100vw',
        left: 0,
      },
    },
    sendButton: {
      background: theme.palette.primary.main,
      position: 'fixed',
      right: 15,
      bottom: 40,
    },
  }),
);

interface Props {
  posts: iPost[];
  tags: { tag: iTag; post: iPost }[];
}

const Feed: NextPage<Props> = ({ posts, tags }) => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    state: { user },
  } = useContext(AppContext);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container>
                {isMobile && (
                  <Grid item>
                    <IconButton title="Open Menu" onClick={toggleMenu}>
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                )}

                <Hidden xsDown>
                  <Grid item>
                    <Typography variant="h4">Home</Typography>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>

            <Grid item>
              <Link href="/home">
                <Image
                  alt="Tsseract logo"
                  height={70}
                  objectFit="contain"
                  priority
                  src="/Main-aside/white_logo_transparent_background.png"
                  width={160}
                />
              </Link>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Hidden xsDown>
                  <Grid item>
                    <Link href={`/profile/${user?.username}`}>
                      <Typography variant="h5">{user?.name}</Typography>
                    </Link>
                  </Grid>
                </Hidden>

                <Grid item>
                  <Link href={`/profile/${user?.username}`}>
                    <Avatar avatar={user?.avatar || {}} size="70px" />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile && isMenuOpen}
        onClose={toggleMenu}
        classes={{ paper: classes.drawerPaper }}
      >
        {!isMobile && <Toolbar />}

        <div className={classes.drawerContainer}>
          <Grid container direction="column" spacing={3}>
            {tags.map((tag) => (
              <Grid item key={tag.tag._id}>
                <TagCard tag={tag} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Drawer>

      <main className={classes.content}>
        <Toolbar />
        <Grid container direction="column">
          {posts.map((post) => (
            <MessagePost
              key={post._id}
              out={user?._id === post.user._id}
              post={post}
            />
          ))}
        </Grid>

        <Paper square className={classes.newPostContainer}>
          <TextField
            color="primary"
            label="Have something in your mind? Start typing it here 🚀"
            margin="normal"
            placeholder="Perfect place to write the title of your post, isn't it?"
            size="small"
            variant="outlined"
            fullWidth
          />

          <IconButton className={classes.sendButton} title="Continue typing">
            <SendIcon />
          </IconButton>
        </Paper>
      </main>
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  authInitialProps(true)(ctx);
  const posts = await getRequest('/posts').then((res) => res.json());
  const tags = await getRequest('/tags').then((res) => res.json());

  return { props: { posts, tags } };
};

export default Feed;
