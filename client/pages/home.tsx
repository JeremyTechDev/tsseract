import Head from 'next/head';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import {
  AppBar,
  Drawer,
  Link,
  Grid,
  Hidden,
  IconButton,
  Paper,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';

import Avatar from '../components/Avatar/Avatar';

import TagCard from '../components/Tag/Card';
import Post from '../components/Post';
import { getRequest } from '../lib/fetch';
import { iPost, iTag } from '../@types';
import { makeStyles, createStyles } from '@mui/styles';
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
      padding: `0 ${theme.spacing(3)}`,
      left: DRAWER_WIDTH,
      [theme.breakpoints.down('lg')]: {
        width: '100vw',
        left: 0,
      },
    },
    sendButton: {
      bottom: 5,
      position: 'fixed',
      right: 20,
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
    theme.breakpoints.down('lg'),
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <Head>
        <title>Tsseract</title>
      </Head>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container>
                  {isMobile && (
                    <Grid item>
                      <IconButton
                        title="Open Menu"
                        onClick={toggleMenu}
                        size="large"
                      >
                        <MenuIcon />
                      </IconButton>
                    </Grid>
                  )}

                  <Hidden smDown>
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
                    src="/Main-aside/dark_logo_transparent_background.png"
                    width={160}
                  />
                </Link>
              </Grid>

              <Grid item>
                <Grid container alignItems="center">
                  <Hidden smDown>
                    <Grid item>
                      <Typography>
                        <strong>Coming soon:</strong>
                      </Typography>
                      <Typography>Create accounts!</Typography>
                    </Grid>
                  </Hidden>

                  <Grid item>
                    <Avatar avatar={user?.avatar || {}} size="70px" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          onClose={toggleMenu}
          open={isMobile && isMenuOpen}
          variant={isMobile ? 'temporary' : 'permanent'}
        >
          <Toolbar />

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
              <Post
                key={post._id}
                out={user?._id === post.user._id}
                post={post}
              />
            ))}
          </Grid>

          <Paper square className={classes.newPostContainer}>
            <TextField
              color="primary"
              label="Soon you will be able to start writing your own post here! 🚀"
              margin="normal"
              placeholder="Perfect place to write the title of your post, isn't it?"
              size="small"
              variant="outlined"
              fullWidth
              disabled
            />

            <IconButton
              className={classes.sendButton}
              color="primary"
              size="large"
              title="Continue typing"
            >
              <SendIcon />
            </IconButton>
          </Paper>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const posts = await getRequest('/posts').then((res) => res.json());
  const tags = await getRequest('/tags').then((res) => res.json());

  return { props: { posts, tags } };
};

export default Feed;
