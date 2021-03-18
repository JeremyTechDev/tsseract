import Image from 'next/image';
import { FC, ReactNode, useState, useContext } from 'react';
import {
  Typography,
  Paper,
  TextField,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
} from '@material-ui/core';
import { StarBorder, Face, Send } from '@material-ui/icons';
import router from 'next/router';

import AppContext from '../../context';
import Link from '../Link';
import useStyles from './styles';

interface Props {
  children: ReactNode;
}

const ChatLayout: FC<Props> = ({ children }) => {
  const classes = useStyles();
  const {
    state: { user },
  } = useContext(AppContext);
  const [newMessageTitle, setNewMessageTitle] = useState('');

  return (
    <div>
      <AppBar elevation={0} position="sticky" color="primary">
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Link href="/home">
              <Image
                alt="Tsseract logo"
                height={80}
                objectFit="contain"
                priority
                src="/Main-aside/white_logo_transparent_background.png"
                width={180}
              />
            </Link>

            <Typography variant="h4">Home</Typography>

            <Grid item>
              <IconButton title="Top Messages">
                <StarBorder />
              </IconButton>

              <IconButton
                onClick={() => router.push(`/profile/${user?.username}`)}
                title="Profile"
              >
                <Face />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {children}

      <Paper square className={classes.chatFooter}>
        <Grid alignItems="center" container justify="space-between">
          <Grid item xs={11}>
            <TextField
              fullWidth
              id="send-message"
              label="Write a message to share with everybody 🚀"
              margin="dense"
              onChange={(e) => setNewMessageTitle(e.target.value)}
              value={newMessageTitle}
              variant="outlined"
            />
          </Grid>

          <Grid container justify="center" item xs={1}>
            <IconButton
              onClick={() =>
                router.push(`/write-message?title=${newMessageTitle}`)
              }
              title="Send Message"
            >
              <Send />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ChatLayout;
