import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NextPage, NextPageContext } from 'next';
import {
  Hidden,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  Grid,
  Theme,
} from '@material-ui/core';
import Avatar from '../components/Avatar/Avatar';

import ChatLayout from '../components/Layout/Chat';
import TagBarLayout from '../components/Layout/TagBar';
import TagCard from '../components/Tag/Card';
import MessagePost from '../components/MessagePost';
import { authInitialProps } from '../lib/auth';
import { getRequest } from '../lib/fetch';
import { iPost, iTag } from '../@types';
import { CallMissedSharp, Face, StarBorder } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/styles';
import AppContext from '../context';
import theme from '../theme';

const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

interface Props {
  posts: iPost[];
  tags: { tag: iTag; post: iPost }[];
}

const Feed: NextPage<Props> = ({ posts, tags }) => {
  const classes = useStyles();
  const {
    state: { user },
  } = useContext(AppContext);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Hidden xsDown>
              <Grid item>
                <Typography variant="h4">Home</Typography>
              </Grid>
            </Hidden>

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
                <Grid item>
                  <Link href={`/profile/${user?.username}`}>
                    <Typography variant="h5">{user?.name}</Typography>
                  </Link>
                </Grid>

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
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />

        <div className={classes.drawerContainer}>
          {tags.map((tag) => (
            <TagCard tag={tag} />
          ))}
        </div>
      </Drawer>

      <main className={classes.content}>
        <Toolbar />
        Main Here
      </main>
    </div>
  );
  // return (
  //   <Grid container>
  //     <Grid item sm={3}>
  //       <TagBarLayout>
  //
  //       </TagBarLayout>
  //     </Grid>

  //     <Grid item sm={9}>
  //       <ChatLayout>
  //         <Grid container direction="column">
  //           {posts.map((post, i) => (
  //             <MessagePost key={post._id} out={i === 48} post={post} />
  //           ))}
  //         </Grid>
  //       </ChatLayout>
  //     </Grid>
  //   </Grid>
  // );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  authInitialProps(true)(ctx);
  const posts = await getRequest('/posts').then((res) => res.json());
  const tags = await getRequest('/tags').then((res) => res.json());

  return { props: { posts, tags } };
};

export default Feed;
